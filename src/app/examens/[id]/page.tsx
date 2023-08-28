'use client';
import { createExamen, updateExamenPratique, updateExamenTheorique } from '@/utils/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export default function ExamenId({ params }: {
    params: {
        id: string;
    };
}) {
    const [type, setType] = useState('Theorique');
    const [date, setDate] = useState('');
    const [langue, setLangue] = useState('');
    const [note, setNote] = useState('admis');
    const [client, setClient] = useState<any | null>(null); // Initialize state with null
    const supabase = createClientComponentClient();
    const fetchClient = async () => {
        try {
            let { data: clientData, error } = await supabase
                .from("clients")
                .select("*")
                .eq("id", params.id)
                .single();
            if (error) {
                throw new Error("Error fetching client.");
            }
            if (clientData) {
                setClient(clientData); // Set the fetched client data
            } else {
                console.log("Client not found");
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchClient(); // Fetch the client data when the component mounts

        // Clean up the component and cancel the request if unmounted before fetch completion
        return () => {
            supabase.removeAllChannels; // Assuming this function cancels any ongoing subscription
        };
    }, [params]); // Re-fetch when the ID changes
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Insert data into Supabase table
        const response = await createExamen(type, langue, date, note);

        console.log('Data inserted successfully:', response);
        if (type === 'Theorique') {
            updateExamenTheorique(response.id,params.id)
        }
        else if (type === 'Pratique') {
            updateExamenPratique(response.id,params.id)
        }
        // Clear form fields after successful submission
        setType('Theorique');
        setDate('');
        setLangue('');
        setNote('non admis');
    };

    return (
        !client ? (<>
            Loading...
        </>) : (<section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                    <form onSubmit={handleSubmit} >
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{client.CIN}
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{client.nom} {client.prenom}
                        </h1>
                        <div className="leading-relaxed mb-4">
                            Category : {client.category}
                            <div>Date d&#039;inscription : {client.inscrit}
                            </div>
                            <div>Telephone : {client.phone}
                            </div>
                            <div>Adresse : {client.Adresse}
                            </div>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="inline-flex items-center text-gray-500">Type</span>
                            <div className="ml-auto relative">
                                <select required className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10" onChange={(e) => setType(e.target.value)}><option value='Theorique' >Theorique</option><option value='Pratique'>Pratique</option></select>
                                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-4 h-4">
                                    <path d="M6 9l6 6 6-6">
                                    </path>
                                </svg></span>
                            </div>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="inline-flex items-center text-gray-500">Date</span>
                            <div className="ml-auto relative">
                                <input
                                    type="date"
                                    value={date}
                                    required
                                    onChange={(e) => setDate(e.target.value)}
                                    className="border rounded p-1 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                            <span className="inline-flex items-center text-gray-500">Admission</span>
                            <div className="ml-auto relative">
                                { }
                                <select required className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10" onChange={(e) => setNote(e.target.value)}><option    value={'admis'}>Admis</option><option value={'non admis'}>No Admis</option></select>
                                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-4 h-4">
                                    <path d="M6 9l6 6 6-6">
                                    </path>
                                </svg></span>
                            </div>
                        </div>
                        <div className="flex">
                            {/* <span className="title-font font-medium text-2xl text-gray-900">Note</span> */}
                            <button type="submit" className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Valider</button>
                        </div>
                    </form>
                </div>
                <img alt="examen" src="/driving.png" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" />
            </div>
            </div>
        </section>)

    );
}
