'use client'
import TransactionsList from "@/components/transactionsList/TransactionsList";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import TransactionModal from "@/components/transactionForm/TransactionForm"
import Image from "next/image";
import Link from "next/link";
import { BiSolidFileBlank } from 'react-icons/bi'
import { FaFileCircleCheck, FaFileInvoiceDollar, FaFilePen } from 'react-icons/fa6'
import { ImProfile } from 'react-icons/im'
import { format } from "date-fns";
import { fr } from "date-fns/locale";
export default function Profile({ params }: {
  params: {
    id: string;
  };
}) {
  const [client, setClient] = useState<any | null>(null); // Initialize state with null
  const [clients, setClients] = useState<any | null>(null); // Initialize state with null
  const [moniteurP, setMoniteurP] = useState<any | null>(null); // Initialize state with null
  const [moniteurT, setMoniteurT] = useState<any | null>(null); // Initialize state with null
  const supabase = createClientComponentClient();
  const [showFullInfo, setShowFullInfo] = useState(false); // State to track whether full info is shown
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the details of the selected client
        const { data: clientData, error } = await supabase
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
        try {
          const { data: moniteurs, error } = await supabase
            .from('moniteurs')
            .select('*')
            .eq('id', clientData.moniteur_pratique).single();
          if (error) {
            throw new Error(`Error fetching  moniteurs.`);
          }
          setMoniteurP(moniteurs)

        } catch (error) {
          console.error(error);
        }
        try {
          const { data: moniteurs, error } = await supabase
            .from('moniteurs')
            .select('*')
            .eq('id', clientData.moniteur_theorique).single();
          if (error) {
            throw new Error(`Error fetching  moniteurs.`);
          }
          setMoniteurT(moniteurs)
        } catch (error) {
          console.error(error);
        }

        // Fetch all clients that were created at the same time as the selected client
        const { data: allClients, error: clientsError } = await supabase
          .from("clients")
          .select("*").limit(3).eq("moniteur_pratique", clientData.moniteur_pratique)
          .neq('image', null)
        // .eq("created_at", clientData.created_at); // Assuming the field name is created_at

        if (clientsError) {
          throw new Error("Error fetching clients.");
        }

        setClients(allClients);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [params]);

  return (
    <>
      {client ? (
        <div>
          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              <div className="w-full md:w-3/12 md:mx-2">
                <div className="bg-white p-3 border-t-4 border-blue-400">
                  <div className="image overflow-hidden">
                    {client.image ?(<><Image width={100} height={100} className="h-auto w-full mx-auto"
                      src={`https://bkvsahkfjyxfeibvwrpm.supabase.co/storage/v1/object/public/machmech/${client.image}`} alt="profile" />
                  </>):(<>
                    <Image width={100} height={100} className="h-auto w-full mx-auto"
                      src={``} alt="profile" />
                  </>)}
                    </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{client.nom} {client.prenom}</h1>
                  <h3 className="text-gray-600 font-lg text-semibold leading-6 rounded-md ">{client.CIN}</h3>
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">categorie : {client.category}</p>
                  <ul
                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto"><span
                        className={`${client.amount > 2000 ? 'bg-green-500' : 'bg-red-700'}  py-1 px-2 rounded text-white text-sm`}>{client.amount}</span></span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Inscrit en</span>
                      <span className="ml-auto">{format(new Date(client.inscrit), 'dd-MM-yyyy', { locale: fr })}</span>
                    </li>
                  </ul>
                </div>
                <div className="my-4"></div>
                <div className="bg-white p-3 hover:shadow">
                  <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                    <span className="text-blue-500">
                      <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                    <span>Dernieres Profiles</span>
                  </div>
                  <div className="flex flex-wrap justify-center max-w-4xl mx-auto gap-4">
                    {/* {client && (
                      <div className="text-center my-2">
                        <Image
                          width={100}
                          height={100}
                          className="h-16 w-16 rounded-full mx-auto"
                          src={client.imageUrl} // Use the actual image URL field
                          alt={''} // Use the actual client name field
                        />
                        <a href="#" className=" text-main-color mt-2">{client.name}</a>
                      </div>
                    )} */}

                    {clients && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {clients.map((clientInfo: any, index: any) => (
                          <div key={index} className="flex flex-col items-center text-center">
                            <Image
                              width={50}
                              height={50}
                              className="h-16 w-16 rounded-full"
                              src={`https://bkvsahkfjyxfeibvwrpm.supabase.co/storage/v1/object/public/machmech/${clientInfo.image}`}
                              alt={clientInfo.nom} // Use the actual client name field
                            />
                            <a href="#" className="text-main-color mt-2">{clientInfo.nom}</a>
                          </div>
                        ))}</div>
                    )}
                    {/* {people.map((person, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <Image
                          width={50}
                          height={50}
                          className="h-16 w-16 rounded-full"
                          src={person.imageUrl}
                          alt={person.name}
                        />
                        <a href="#" className="text-main-color mt-2">{person.name}</a>
                      </div>
                    ))} */}
                  </div>
                </div>
                <div className="my-4"></div>
                <div className="bg-white p-3 hover:shadow">
                  <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                    <span className="text-blue-500">
                      <BiSolidFileBlank />
                    </span>
                    <span>Les documents de condidat</span>
                  </div>
                  <div className="flex flex-wrap justify-center max-w-4xl mx-auto gap-4">

                    <div>
                      <Link href={`/clients-pdf/${client.id}`} style={{ textDecoration: "none" }}>
                        <div className="flex justify-center my-2 hover:text-lg hover:text-gray-600">
                          <div className="text-green-500 mx-2" ><ImProfile /></div>
                          Carte Condidat
                        </div>
                      </Link>
                      <Link href={`/contrat-arabe/${client.id}`} style={{ textDecoration: "none" }}>
                        <div className="flex justify-center my-2 hover:text-lg hover:text-gray-600">
                          <div className="w-5 h-5"><svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><g fill-rule="nonzero"><path fill="#4D4D4D" d="M256 0c70.683 0 134.689 28.663 181.012 74.987C483.336 121.311 512 185.316 512 256c0 70.683-28.664 134.689-74.988 181.012C390.689 483.336 326.683 512 256 512c-70.677 0-134.689-28.664-181.013-74.988C28.663 390.689 0 326.676 0 256c0-70.684 28.663-134.689 74.987-181.013C121.311 28.663 185.316 0 256 0z" /><path fill="#fff" d="M256.001 19.596c65.278 0 124.383 26.467 167.162 69.243 42.777 42.78 69.243 101.884 69.243 167.162S465.94 380.384 423.16 423.16c-42.776 42.78-101.881 69.246-167.159 69.246-65.278 0-124.382-26.466-167.162-69.243-42.776-42.779-69.243-101.884-69.243-167.162S46.063 131.619 88.839 88.839c42.78-42.776 101.884-69.243 167.162-69.243z" /><path fill="#C1272D" d="M256.001 39.594c119.518 0 216.407 96.887 216.407 216.407 0 119.518-96.889 216.407-216.407 216.407-119.52 0-216.407-96.889-216.407-216.407 0-119.52 96.887-216.407 216.407-216.407z" /><path fill="#006233" d="M260.913 172.688l19.517 60.067h79.085l-63.982 46.485 24.432 75.192-63.963-46.471-63.963 46.471 24.431-75.192-63.982-46.485h79.085l24.429-75.184 4.911 15.117zm22.879 70.416l8.384 25.802 35.514-25.802h-43.898zm16.523 84.279l-13.568-41.759-21.955 15.951 35.523 25.808zm-16.926-52.093l-10.458-32.186h-33.859l-10.458 32.186 27.388 19.898 27.387-19.898zm-13.82-42.535l-13.567-41.757-13.567 41.757h27.134zm-22.358 68.82l-21.954-15.951-13.568 41.759 35.522-25.808zm-62.898-58.471l35.515 25.802 8.383-25.802h-43.898z" /></g></svg>
                          </div>
                          Contrat Arabic
                        </div>
                      </Link>
                      <Link href={`/contrat-fr/${client.id}`} style={{ textDecoration: "none" }}>
                        <div className="flex justify-center my-2 hover:text-lg hover:text-gray-600">
                          <div>
                            <Image src={"/france.svg"} width={30} height={30} alt="france" />
                          </div>
                          Contrat Francais
                        </div>
                      </Link>
                      <Link href={`/fiche-presence/${client.id}`} style={{ textDecoration: "none" }}>
                        <div className="flex justify-center  my-2 hover:text-lg hover:text-gray-600">
                          <div className="text-green-500 mx-2"><FaFilePen /> </div>
                          Fiche d&lsquo;enseignement
                        </div>
                      </Link>
                      <Link href={`/clients-pdf/${client.id}`} style={{ textDecoration: "none" }}>
                        <div className="flex justify-center my-2 hover:text-lg hover:text-gray-600">
                          <div className="text-green-500 mx-2"><FaFileInvoiceDollar /> </div>
                          Fiche de Verssement
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-9/12 mx-2 h-64">

                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="text-blue-500">
                      <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <span className="tracking-wide">A propos</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Prenom</div>
                        <div className="px-4 py-2">{client.prenom}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Nom</div>
                        <div className="px-4 py-2">{client.nom}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Sexe</div>
                        <div className="px-4 py-2">{client.sexe}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">CIN</div>
                        <div className="px-4 py-2">{client.CIN}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Addresse actuelle</div>
                        <div className="px-4 py-2">{client.Adresse}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                        <a href={`tel:${client.phone}`} className="px-4 py-2">{client.phone}</a>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 pt-2 font-semibold">Categorie</div>
                        <div className="px-4 py-2">{client.category}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Date de Naissance</div>
                        <div className="px-4 py-2">{format(new Date(client.naissance), 'dd-MM-yyyy', { locale: fr })}</div>
                      </div>
                    </div>
                  </div>

                  {showFullInfo && (
                    <div className="bg-white py-3 shadow-sm rounded-sm">
                      <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Moniteur theorique</div>
                          <div className="px-4 py-2">{moniteurT.nom} {moniteurT.prenom}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Moniteur pratique</div>
                          <div className="px-4 py-2">{moniteurP.nom} {moniteurP.prenom}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Examen theorique</div>
                          <div className="px-4 py-2">{client.sexe}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Examen pratique</div>
                          <div className="px-4 py-2">{client.sexe}</div>
                        </div>
                        
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Email</div>
                          <div className="px-4 py-2">
                            <a className="text-blue-800" href={`mailto:${client.email}`}>{client.email < 10 ? client.email : "..."}</a>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Date d&#39;inscription</div>
                          <div className="px-4 py-2">{client.inscrit}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setShowFullInfo(!showFullInfo)} // Toggle showFullInfo state on button click
                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                  >
                    {showFullInfo ? "Masquer les informations" : "Afficher Toute Les informations"}
                  </button>
                </div>


         
                <div className="bg-white p-3 shadow-sm rounded-sm">

                  <>
                    <TransactionModal amount_id={...client.amount_id} client_id={client.id} />
                  </>
                  <div className="grid grid-flow-col">

                    <TransactionsList amount_id={client.amount_id} />
                    {/* <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span className="text-blue-500">
                          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </span>
                        <span className="tracking-wide">Experience</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-teal-600">Owner at Her Company Inc.</div>
                          <div className="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                        <li>
                          <div className="text-teal-600">Owner at Her Company Inc.</div>
                          <div className="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                        <li>
                          <div className="text-teal-600">Owner at Her Company Inc.</div>
                          <div className="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                        <li>
                          <div className="text-teal-600">Owner at Her Company Inc.</div>
                          <div className="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span className="text-blue-500">
                          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path fill="#fff"
                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                          </svg>
                        </span>
                        <span className="tracking-wide">Education</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-teal-600">Masters Degree in Oxford</div>
                          <div className="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                        <li>
                          <div className="text-teal-600">Bachelors Degreen in LPU</div>
                          <div className="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : (
        <p>Loading...</p>
      )
      }
    </>
  );
}
