// utils/supabase.js
'use server'
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { Console } from "console";
import { cookies } from "next/headers";
import { supabase } from "./client";

const supabase2 = createServerActionClient({
  cookies,
});
const getUser=async()=>{
return await (supabase2.auth.getUser()).data.user.id
}
const updateTable = async (formData, tablename, id) => {
  const { data: formDataResult, error: formDataError } = await supabase
    .from(tablename)
    .update([
      {
        ...formData,
      },
    ]).eq('id', id).select();

  return { formDataResult, formDataError };

}
const createClient2 = async (clientData) => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .insert([{ ...clientData, user_id: (await (supabase2.auth.getUser())).data.user.id }]).select();

    if (error) {
      throw error;
    }
    await handleUpdate(data[0].id);
    return data;
  } catch (error) {
    throw error;
  }
};
const createMoniteur = async (moniteurData) => {
  try {
    const { data, error } = await supabase
      .from("moniteurs")
      .insert([{ ...moniteurData, user_id: (await (supabase2.auth.getUser())).data.user.id }]).select();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};
const createCar = async (carData,filename) => {
  try {
    // let response=uploadFile(file,filename+'.png')
    const { data, error } = await supabase
      .from("voitures")
      .insert([{ ...carData, user_id: (await (supabase2.auth.getUser())).data.user.id, 'image': filename }]).select();
    if (uploadError) {
      console.log(uploadError) ;
    };
    console.log (data);
  } catch (error) {
     console.log(error);
  }
};

const handleUpdate = async (clientId) => {
  try {
    // Fetch the client's amount_id and category_id
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('amount_id, category_id')
      .eq('id', clientId)
      .single();

    if (clientError) {
      console.error('Error fetching client data:', clientError);
      return;
    }

    // Update the category with the new amount_id
    const { data, error } = await supabase
      .from('categories')
      .update({ amount_id: clientData.amount_id })
      .eq('id', clientData.category_id);

    if (error) {
      console.error('Error updating category:', error);
    } else {
      console.log('Category updated successfully:', data);
    }
  } catch (error) {
    console.error('Error updating category:', error.message);
  }
};

const createTransaction = async (amount_id, clientId, value, date) => {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .insert({ value: value, date: date, amount_id: amount_id, client_id: clientId,user_id: (await (supabase2.auth.getUser())).data.user.id });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
const createDepense = async (title, commentaire, value, date) => {
  try {
    const { data, error } = await supabase
      .from("depenses")
      .insert({ value: value, date: date, title: title, commentaire: commentaire , user_id: (await (supabase2.auth.getUser())).data.user.id});

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
const createExamen = async (type, langue, date, note) => {
  try {
    const { data, error } = await supabase
    .from('examens')
    .insert([{ type, date, langue, note ,user_id: (await (supabase2.auth.getUser())).data.user.id}]).select().single();
    if (error) {
      throw error;
    }
    

    return data;
  } catch (error) {
    throw error;
  }
};
const updateExamenTheorique = async (id,client_id) => {
  try {
    const { data, error } = await supabase
    .from('clients')
    .update({ examen_theorique: id })
    .eq('id', client_id);
    if (error) {
      throw error;
    }
    

    return data;
  } catch (error) {
    throw error;
  }
};
const updateExamenPratique = async (id,client_id) => {
  try {
    const { data, error } = await supabase
    .from('clients')
    .update({ examen_pratique: id })
    .eq('id', client_id);
    if (error) {
      throw error;
    }
    

    return data;
  } catch (error) {
    throw error;
  }
};

async function uploadFile(file, nom) {
  const { data, error } = await supabase.storage.from('machmech').upload(nom, file)
  if (error) {
    console.log(error)
    throw error;
  } else {
    console.log(data);
    return data;
  }
}
async function getClient(id) {

  const { data, error } = (await supabase.from('clients').select("*").eq('id', id).single())
  if (error) {
    console.log(error)
    throw error;
  }
  return data;
}
async function getMoniteur(id) {

  const { data: moniteur, error } = (await supabase.from('moniteurs').select("*").eq('id', id).single())
  if (error) {
    console.log(error)
    throw error;
  }
  return moniteur;
}
async function getMoniteurs() {
  const { data: moniteurs, error } = await supabase.from("moniteurs").select("*");
  if (error) {
    console.log(error)
    throw error;
  }
  return moniteurs;
}
export { updateTable, createClient2, uploadFile, getClient, createTransaction, createMoniteur, getMoniteurs, getMoniteur, createCar ,createExamen,updateExamenPratique,updateExamenTheorique,createDepense,getUser}