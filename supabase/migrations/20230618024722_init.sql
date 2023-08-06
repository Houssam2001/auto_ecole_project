-- Create a table for clients
create table if not exists clients (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  name text not null,
  email text not null,
  phone text
);

-- Create a table for amounts
create table if not exists amounts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  amount numeric not null
);

-- Create a table for transactions
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  description text,
  client_id uuid references clients(id) not null,
  amount_id uuid references amounts(id) not null
);

-- Function to check if the authenticated user can insert transactions for their own clients
create or replace function check_client_access()
returns trigger as $$
begin
  if (auth.uid() = (select user_id from clients where id = new.client_id)) then
    return new;
  else
    raise exception 'Authenticated user does not have access to this client';
  end if;
end;
$$ language plpgsql;

-- Set up Row Level Security (RLS) for clients
alter table clients enable row level security;

create policy "Authenticated users can insert their own clients" on clients
  for insert to authenticated with check (auth.uid() = user_id);

-- Set up Row Level Security (RLS) for amounts
alter table amounts enable row level security;

create policy "Authenticated users can select amounts" on amounts
  for select to authenticated using (true);

-- Set up Row Level Security (RLS) for transactions
alter table transactions enable row level security;

create policy "Authenticated users can select transactions" on transactions
  for select to authenticated using (true);

-- Create a trigger to update the client's amount on transaction insertion or deletion
create or replace function update_client_amount()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    -- Transaction Insertion: Add the new transaction's amount to the client's current amount
    update amounts
    set amount = amount + new.amount
    where id = new.client_id;
  elsif tg_op = 'DELETE' then
    -- Transaction Deletion: Subtract the deleted transaction's amount from the client's current amount
    update amounts
    set amount = amount - old.amount
    where id = old.client_id;
  end if;
  
  return new;
end;
$$ language plpgsql;

-- Create a trigger to update the client's amount on transaction insertion or deletion
create trigger update_client_amount_trigger
after insert or delete on transactions
for each row
execute function update_client_amount();
