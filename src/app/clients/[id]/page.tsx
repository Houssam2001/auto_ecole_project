'use client'
import TransactionsList from "@/components/transactionsList/TransactionsList";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import TransactionModal from "@/components/transactionForm/TransactionForm"
import Image from "next/image";
import Link from "next/link";

export default function Profile({ params }: {
  params: {
    id: string;
  };
}) {
  const [client, setClient] = useState<any | null>(null); // Initialize state with null
  const supabase = createClientComponentClient();
  const [showFullInfo, setShowFullInfo] = useState(false); // State to track whether full info is shown

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

  return (
    <>
      {client ? (
        <div>
          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              <div className="w-full md:w-3/12 md:mx-2">
                <div className="bg-white p-3 border-t-4 border-blue-400">
                  <div className="image overflow-hidden">
                    <Image width={50} height={50} className="h-auto w-full mx-auto"
                      src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                      alt="" />
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
                      <span>Member since</span>
                      <span className="ml-auto">{client.inscrit}</span>
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
                    <span>Similar Profiles</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-center my-2">
                      <Image width={50} height={50} className="h-16 w-16 rounded-full mx-auto"
                        src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                        alt="" />
                      <a href="#" className="text-main-color">Kojstantin</a>
                    </div>
                    <div className="text-center my-2">
                      <Image width={50} height={50} className="h-16 w-16 rounded-full mx-auto"
                        src={""}
                        // src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                        alt="" />
                      <a href="#" className="text-main-color">James</a>
                    </div>
                    <div className="text-center my-2">
                      <Image width={50} height={50} className="h-16 w-16 rounded-full mx-auto"
                        // src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        src={""}
                        alt=""
                      />
                      <a href="#" className="text-main-color">Natie</a>
                    </div>
                    <div className="text-center my-2">
                      <Image width={50} height={50} className="h-16 w-16 rounded-full mx-auto"
                        // src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                        src={""}
                        alt="" />
                      <a href="#" className="text-main-color">Casey</a>
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
                    <span className="tracking-wide">About</span>
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
                        <div className="px-4 py-2 font-semibold">Current Address</div>
                        <div className="px-4 py-2">{client.Adresse}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                        <a href={`tel:${client.phone}`} className="px-4 py-2">+212 {client.phone}</a>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 pt-2 font-semibold">Categorie</div>
                        <div className="px-4 py-2">{client.category}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Date de Naissance</div>
                        <div className="px-4 py-2">{client.naissance}</div>
                      </div>
                    </div>
                  </div>

                  {showFullInfo && (
                    <div className="bg-white py-3 shadow-sm rounded-sm">
                      <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Moniteur theorique</div>
                          <div className="px-4 py-2">{client.prenom}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Moniteur pratique</div>
                          <div className="px-4 py-2">{client.nom}</div>
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
                          <div className="px-4 py-2 font-semibold">Current Address</div>
                          <div className="px-4 py-2">{client.Adresse}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Permanant Address</div>
                          <div className="px-4 py-2">{client.Adresse}</div>
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
                    {showFullInfo ? "Hide Full Information" : "Show Full Information"}
                  </button>
                </div>


                <Link href={`/clients-pdf/${client.id}`} style={{ textDecoration: "none" }}>
                  <div className="viewButton">View</div>
                </Link>
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
