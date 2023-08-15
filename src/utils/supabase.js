// utils/supabase.js
'use server'
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const supabase2 = createServerActionClient({
    cookies,
  });
  
 const createClient2 = async (clientData) => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .insert([{ ...clientData, user_id: (await ( supabase2.auth.getUser())).data.user.id }]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
 const createTransaction = async (transaction,clientId) => {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .insert({transaction:transaction});

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
async function uploadFile(file,nom) {
  const { data, error } = await supabase.storage.from('machmech').upload(nom, file)
  if (error) {
    console.log(error)
    throw error;
  } else {
    console.log(data);
    return data;
  }
}
export {createClient2,uploadFile}