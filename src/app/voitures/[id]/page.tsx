'use client'
import { useRef, useEffect, Fragment, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Tab } from '@headlessui/react'
import { Transition } from '@headlessui/react'
import { Caveat } from 'next/font/google'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GiSteeringWheel } from 'react-icons/gi'
import { RiOilFill } from 'react-icons/ri'
import { FaOilCan } from 'react-icons/fa'
import { createClient } from '@supabase/supabase-js'
import { updateTable } from '@/utils/supabase'
const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap'
})
interface Tab {
    title: string
    img: string
    tag: string
    excerpt: string
    link: string,
    formType: string
}
export default function UnconventionalTabs({ params }: {
    params: {
        id: string;
    };
}) {
    const [voiture, setVoiture] = useState<any | null>(); // Initialize state with null

    const supabase = createClientComponentClient();
    const [vidangeFormValues, setVidangeFormValues] = useState({
        date: "",
        kilometrage: "",
        huile: "",
        periodicitee: "",
        vidange_moteur: false,
        vidange_boite: false,
        vidange_frein: false,
        vidange_assiste: false,
        filtre_huile: false,
        filtre_carburant: false,
        liquide_refroidissement: false,
        filtre_air: false
    });
    const [visiteFormValues, setVisiteFormValues] = useState({
        date: "",
        centre: "",
        periodicitee: "",
    });
    const [assuranceFormValues, setAssuranceFormValues] = useState({
        date: "",
        societe: "",
        periodicitee: "",
    });

    const handleAssuranceInputChange = (event: any) => {
        const { name, value } = event.target;
        setAssuranceFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleVidangeInputChange = (event: any) => {
        const { name, value } = event.target;
        setVidangeFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleVisiteInputChange = (event: any) => {
        const { name, value } = event.target;
        setVisiteFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event: any, formType: any) => {
        event.preventDefault();
        try {
            let formData = {};
            let tableName = ''; // Name of the table to update
            let foreignKey = ''; // Corresponding foreign key column

            if (formType === "vidange") {
                formData = {
                    date: vidangeFormValues.date,
                    kilometrage: vidangeFormValues.kilometrage,
                    huile: vidangeFormValues.huile,
                    periodicitee: vidangeFormValues.periodicitee,
                    vidange_moteur: vidangeFormValues.vidange_moteur,
                    vidange_boite: vidangeFormValues.vidange_boite,
                    vidange_frein: vidangeFormValues.vidange_frein,
                    vidange_assiste: vidangeFormValues.vidange_assiste,
                    filtre_huile: vidangeFormValues.filtre_huile,
                    filtre_carburant: vidangeFormValues.filtre_carburant,
                    liquide_refroidissement: vidangeFormValues.liquide_refroidissement,
                    filtre_air: vidangeFormValues.filtre_air
                };
                tableName = 'vidange';
                foreignKey = 'vidange_id';

            } else if (formType === "visite") {
                formData = {
                    date: visiteFormValues.date,
                    centre: visiteFormValues.centre,
                    periodicitee: visiteFormValues.periodicitee,
                };
                tableName = 'visite';
                foreignKey = 'visite_id';

            }
            else if (formType === "assurance") {
                formData = {
                    date: assuranceFormValues.date,
                    societe: assuranceFormValues.societe,
                    periodicitee: assuranceFormValues.periodicitee,
                };
                tableName = 'assurance';
                foreignKey = 'assurance_id';

            }
            const updateResponse = await updateTable(formData, tableName, voiture[foreignKey]);
            if (updateResponse.formDataError) {
                console.error(`Error updating ${formType} data:`, updateResponse.formDataError.message);
            } else {
                console.log(`${formType} form data inserted successfully:`, updateResponse.formDataResult);
                if (formType === "vidange") {
                    setVidangeFormValues({
                        date: "",
                        kilometrage: "",
                        huile: "",
                        periodicitee: "",
                        vidange_moteur: false,
                        vidange_boite: false,
                        vidange_frein: false,
                        vidange_assiste: false,
                        filtre_huile: false,
                        filtre_carburant: false,
                        liquide_refroidissement: false,
                        filtre_air: false
                    });
                } else if (formType === "visite") {
                    setVisiteFormValues({
                        date: "",
                        centre: "",
                        periodicitee: "",
                    });
                }
                else if (formType === "assurance") {
                    setAssuranceFormValues({
                        date: "",
                        societe: "",
                        periodicitee: "",
                    });
                }
            }
        } catch (error) {
            console.error(`Error handling ${formType} form submission:`, error);

        }
    };


    const fetchVoiture = async () => {
        try {
            let { data: voitureData, error } = await supabase
                .from("voitures")
                .select("*")
                .eq("id", params.id)
                .single();

            if (error) {
                throw new Error("Error fetching Voiture.");
            }
            if (voitureData) {
                setVoiture(voitureData); // Set the fetched Voiture data
                console.log(voitureData)
            } else {
                console.log("Voiture not found");
            }
        } catch (error: any) {
            console.error(error.message);
        }

    };
    const handleCheckboxChange = (fieldName: any, newValue: any) => {
        setVidangeFormValues(prevValues => ({
            ...prevValues,
            [fieldName]: newValue,
        }));
    };

    const tabs: Tab[] = [
        {
            title: 'Assurance /التامين',
            img: '/model-icon.png',
            tag: 'Mountain',
            excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            link: '#0',
            formType: 'assurance'
        },
        {
            title: 'Vidange et changement des pieces / تغيير الزيت / قطع لغيار',
            img: '/model-icon.png',
            tag: 'vidange',
            excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            link: '#0',
            formType: 'vidange'
        },
        {

            title: 'Visite technique/الزيارة الفنية',
            img: '/model-icon.png',
            tag: 'visite',
            excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            link: '#0',
            formType: 'visite'
        },
    ]
    const tabsRef = useRef<HTMLDivElement>(null)
    const heightFix = () => {
        if (tabsRef.current && tabsRef.current.parentElement) tabsRef.current.parentElement.style.height = `${tabsRef.current.clientHeight}px`
    }
    useEffect(() => {
        fetchVoiture();
        heightFix();
        return () => {
            supabase.removeAllChannels; // Assuming this function cancels any ongoing subscription
        };

    }, [params])
    useEffect(() => {
        if (voiture) {
            const fetchVidangeData = async () => {
                try {
                    let { data: vidangeResponse, error } = await supabase
                        .from("vidange")
                        .select("*")
                        .eq("id", voiture.vidange_id)
                        .single();

                    if (error) {
                        console.error(error);
                    } if (vidangeResponse) {
                        console.log(vidangeResponse)
                        setVidangeFormValues({
                            date: vidangeResponse.date,
                            kilometrage: vidangeResponse.kilometrage,
                            huile: vidangeResponse.huile,
                            periodicitee: vidangeResponse.periodicitee,
                            vidange_moteur: vidangeResponse.vidange_moteur,
                            vidange_boite: vidangeResponse.vidange_boite,
                            vidange_frein: vidangeResponse.vidange_frein,
                            vidange_assiste: vidangeResponse.vidange_assiste,
                            filtre_huile: vidangeResponse.filtre_huile,
                            filtre_carburant: vidangeResponse.filtre_carburant,
                            liquide_refroidissement: vidangeResponse.liquide_refroidissement,
                            filtre_air: vidangeResponse.filtre_air,
                        });
                    }
                } catch (error) {
                    throw error;
                }
            };

            const fetchVisiteData = async () => {
                const { data, error } = await supabase
                    .from("visite")
                    .select("*")
                    .eq("id", voiture.visite_id)
                    .maybeSingle();
                if (error) {
                    console.error(error);
                } else {
                    setVisiteFormValues({
                        date: data?.date,
                        centre: data?.centre,
                        periodicitee: data?.periodicitee,
                    });
                }
            };

            const fetchAssuranceData = async () => {
                const { data, error } = await supabase
                    .from("assurance")
                    .select("*")
                    .eq("id", voiture.assurance_id)
                    .maybeSingle();
                if (error) {
                    console.error(error);
                } else {
                    setAssuranceFormValues({
                        date: data?.date,
                        societe: data?.societe,
                        periodicitee: data?.periodicitee,
                    });
                }
            };

            fetchVidangeData();
            fetchVisiteData();
            fetchAssuranceData();
        }
    }, [voiture, supabase]);


    return (
        <>
            {voiture ? (
                <>
                    <section>
                        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                            <div className="flex flex-wrap items-center mx-auto max-w-7xl">
                                <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                                    <div>
                                        <div className="relative w-full max-w-lg">
                                            <div className="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

                                            <div className="absolute rounded-full bg-fuchsia-300 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                                            <div className="relative">
                                                <Image width={100} height={100} className="object-cover object-center mx-auto rounded-lg shadow-2xl" alt="hero" src={`https://bkvsahkfjyxfeibvwrpm.supabase.co/storage/v1/object/public/machmech/${voiture.image}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                                    <span className="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase"> {voiture.categorie} </span>
                                    <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">{voiture.matricule}.</h1>
                                    <p className="mb-8 text-base leading-relaxed text-left text-gray-500">{voiture.marque}</p>
                                    <div className="flex-col mt-0 lg:mt-6 max-w-7xl sm:flex">
                                        <dl className="grid grid-cols-1 gap-12 md:grid-cols-2">
                                            <div>
                                                <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 text-blue-600 rounded-full bg-blue-50">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 icon icon-tabler icon-tabler-aperture" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <circle cx="12" cy="12" r="9"></circle>
                                                        <line x1="3.6" y1="15" x2="14.15" y2="15"></line>
                                                        <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(72 12 12)"></line>
                                                        <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(144 12 12)"></line>
                                                        <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(216 12 12)"></line>
                                                        <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(288 12 12)"></line>
                                                    </svg>
                                                </dt>
                                                <dd className="flex-grow">
                                                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-neutral-600">Short title</h2>
                                                    <p className="text-base leading-relaxed text-gray-400">{voiture.model}.</p>
                                                    <a href={`/voitures-pdf/${voiture.id}`} className="inline-flex items-center mt-6 font-semibold text-blue-500 md:mb-2 lg:mb-0 hover:text-neutral-600" title="read more">
                                                        Telecharger l&apos;affiche d&apos;{voiture.categorie}
                                                        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                                                        </svg>
                                                    </a>

                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 text-blue-600 rounded-full bg-blue-50">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 icon icon-tabler icon-tabler-aperture" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <circle cx="12" cy="12" r="9"></circle>
                                                        <line x1="3.6" y1="15" x2="14.15" y2="15"></line>
                                                        <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(72 12 12)"></line>
                                                        <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(144 12 12)"></line>
                                                        <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(216 12 12)"></line>
                                                        <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(288 12 12)"></line>
                                                    </svg>
                                                </dt>
                                                <dd className="flex-grow">
                                                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-neutral-600">Short title</h2>
                                                    <p className="text-base leading-relaxed text-gray-400">Explain 2 great feature here. Information about the feature.</p>
                                                    <a href="#" className="inline-flex items-center mt-6 font-semibold text-blue-500 md:mb-2 lg:mb-0 hover:text-neutral-600" title="read more">
                                                        Learn More
                                                        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                                                        </svg>
                                                    </a>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Tab.Group>
                        {({ selectedIndex }) => (
                            <div className={`${caveat.variable}`}>
                                {/* Buttons */}

                                <div className="flex justify-center">
                                    <Tab.List className="max-[480px]:max-w-[180px] inline-flex flex-wrap justify-center bg-slate-200 rounded-[20px] p-1 mb-8 min-[480px]:mb-12">
                                        {tabs.map((tab, index) => (
                                            <Tab key={index} as={Fragment}>
                                                <button
                                                    className={`flex-1 text-sm font-medium h-10 px-4 rounded-2xl  focus-visible:outline-none ui-focus-visible:outline-none ui-focus-visible:ring ui-focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out whitespace-pre-wrap ${selectedIndex === index ? 'bg-white text-slate-900' : 'text-slate-600 hover:text-slate-900'} ${tab.formType === 'vidange' || 'visite' ? '' : 'md:text-xs'}`}>{tab.formType === 'vidange' ? 'Vidange/تغيير الزيت' : tab.title}</button>
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                </div>
                                {/* Tab panels */}
                                <Tab.Panels className="max-w-[640px] mx-auto">
                                    <div className="relative flex flex-col" ref={tabsRef}>
                                        {tabs.map((tab, index) => (
                                            <Tab.Panel
                                                key={index}
                                                as={Fragment}
                                                static={true}
                                            >
                                                <Transition
                                                    as="article"
                                                    show={selectedIndex === index}
                                                    unmount={false}
                                                    className="w-full bg-white rounded-2xl shadow-xl min-[480px]:flex items-stretch focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
                                                    enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 transform order-first"
                                                    enterFrom="opacity-0 -translate-y-8"
                                                    enterTo="opacity-100 translate-y-0"
                                                    leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-300 transform absolute"
                                                    leaveFrom="opacity-100 translate-y-0"
                                                    leaveTo="opacity-0 translate-y-12"
                                                    beforeEnter={() => heightFix()}
                                                >
                                                    {/* Form */}
                                                    <form
                                                        onSubmit={(event) => handleFormSubmit(event, tab.formType)}
                                                        className="w-full flex flex-col justify-center p-5 pl-3"
                                                    >
                                                        {tab.formType === "vidange" && (
                                                            <>
                                                                <div className="mb-4">
                                                                    <label htmlFor="vidangeDate" className="flex mb-2 justify-between">
                                                                        <div className="text-sm font-medium text-gray-700">Date Revision</div>
                                                                        <div className="text-sm font-medium text-gray-700">تاريخ المعاينة</div>
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        id="vidangeDate"
                                                                        name="date"
                                                                        value={vidangeFormValues.date}
                                                                        onChange={handleVidangeInputChange}
                                                                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
                                                                    />
                                                                </div>

                                                                <div className="mb-4">
                                                                    <label htmlFor="vidangeKilometrage" className="flex mb-2 justify-between">
                                                                        <div className="text-sm font-medium text-gray-700">Kilometrage</div>
                                                                        <div className="text-sm font-medium text-gray-700">الكيلومترات</div>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="vidangeKilometrage"
                                                                        name="kilometrage"
                                                                        value={vidangeFormValues.kilometrage}
                                                                        onChange={handleVidangeInputChange}
                                                                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
                                                                    />
                                                                </div>

                                                                <div className="mb-4">
                                                                    <label htmlFor="vidangeHuile" className="flex mb-2 justify-between">
                                                                        <div className="text-sm font-medium text-gray-700">Type huile de moteur</div>
                                                                        <div className="text-sm font-medium text-gray-700">نوع زيت المحرك</div>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="vidangeHuile"
                                                                        name="huile"
                                                                        value={vidangeFormValues.huile}
                                                                        onChange={handleVidangeInputChange}
                                                                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
                                                                    />
                                                                </div>

                                                                {/* Vidange checkboxes */}
                                                                <div className="mb-4 border-2 mx-12 border-blue-600 py-1 rounded-lg">
                                                                    <h2 className="text-center font-bold text-gray-900">Vidange</h2>
                                                                </div>

                                                                <div className="flex mb-2 justify-between">
                                                                    <div className="flex mb-2 justify-between">
                                                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                                                            <GiSteeringWheel className="mr-1 w-5 h-5" /> Huile direction/assistée - زيت التوجيه
                                                                            <input
                                                                                type="checkbox"
                                                                                className="mr-4 ml-4 w-5 h-5"
                                                                                checked={vidangeFormValues.vidange_assiste}
                                                                                onChange={(e) => handleCheckboxChange('vidange_assiste', e.target.checked)}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex mb-2 justify-between">
                                                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="mr-3 ml-4 w-5 h-5"
                                                                                checked={vidangeFormValues.vidange_moteur}
                                                                                onChange={(e) => handleCheckboxChange('vidange_moteur', e.target.checked)}
                                                                            /> Huile Moteur - زيت المحرك
                                                                            <RiOilFill className="ml-2 w-5 h-5" />
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="flex mb-2 justify-between">
                                                                    <div className="flex mb-2 justify-between">
                                                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                                                            <GiSteeringWheel className="mr-1 w-5 h-5" /> Huile Boite/Trans - زيت علبة السرعات
                                                                            <input
                                                                                type="checkbox"
                                                                                className="mr-3 ml-4 w-5 h-5"
                                                                                checked={vidangeFormValues.vidange_boite}
                                                                                onChange={(e) => handleCheckboxChange('vidange_boite', e.target.checked)}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex mb-2 justify-between">
                                                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="mr-3 ml-4 w-5 h-5"
                                                                                checked={vidangeFormValues.vidange_frein}
                                                                                onChange={(e) => handleCheckboxChange('vidange_frein', e.target.checked)}
                                                                            /> Huile Frein - زيت الفرامل
                                                                            <FaOilCan className="ml-2 w-5 h-5" />
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                {/* Remplacement checkboxes */}
                                                                <div className="mb-4 border-2 mx-12 border-blue-600 py-1 rounded-lg">
                                                                    <h2 className="text-center font-bold text-gray-900">Remplacement</h2>
                                                                </div>

                                                                <div className="flex mb-2 justify-between">
                                                                    <div className="flex mb-2 justify-between">
                                                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                                                            <GiSteeringWheel className="mr-1 w-5 h-5" /> Filtre Huile - مصفاة النفط
                                                                            <input
                                                                                type="checkbox"
                                                                                className="mr-3 ml-14 w-5 h-5"
                                                                                checked={vidangeFormValues.filtre_huile}
                                                                                onChange={(e) => handleCheckboxChange('filtre_huile', e.target.checked)}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex mb-2 justify-between">
                                                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="mr-3 ml-3 w-5 h-5"
                                                                                checked={vidangeFormValues.filtre_carburant}
                                                                                onChange={(e) => handleCheckboxChange('filtre_carburant', e.target.checked)}
                                                                            /> Filtre Carburant - مرشح الوقود
                                                                            <GiSteeringWheel className="ml-2 w-5 h-5" />
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="flex mb-2 justify-between">
                                                                    <div className="flex mb-2 justify-between">
                                                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                                                            <GiSteeringWheel className="mr-1 w-5 h-5" /> liquide de refroidissement - محلول التبريد
                                                                            <input
                                                                                type="checkbox"
                                                                                className="mr-3 ml-3 w-5 h-5"
                                                                                checked={vidangeFormValues.liquide_refroidissement}
                                                                                onChange={(e) => handleCheckboxChange('liquide_refroidissement', e.target.checked)}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex mb-2 justify-between">
                                                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="mr-14 ml-3 w-5 h-5"
                                                                                checked={vidangeFormValues.filtre_air}
                                                                                onChange={(e) => handleCheckboxChange('filtre_air', e.target.checked)}
                                                                            /> Filtre à air - مصفاة هواء
                                                                            <GiSteeringWheel className="ml-2 w-5 h-5" />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        {tab.formType === "visite" && (
                                                            <>
                                                                <div className="mb-4">
                                                                    <label htmlFor="visiteDate" className="flex mb-2 justify-between">
                                                                        <div className="text-sm font-medium text-gray-700">Date Revision</div>
                                                                        <div className="text-sm font-medium text-gray-700">تاريخ المعاينة</div>
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        id="visiteDate"
                                                                        name="date"
                                                                        value={visiteFormValues.date}
                                                                        onChange={handleVisiteInputChange}
                                                                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label htmlFor="visiteCentre" className="flex mb-2 justify-between">
                                                                        <div className="text-sm font-medium text-gray-700">Centre Visite</div>
                                                                        <div className="text-sm font-medium text-gray-700">مركز الزيارة</div>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="visiteCentre"
                                                                        name="centre"
                                                                        value={visiteFormValues.centre}
                                                                        onChange={handleVisiteInputChange}
                                                                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label htmlFor="visitePeriodicitee" className="flex mb-2 justify-between">
                                                                        <div className="text-sm font-medium text-gray-700">Périodicité</div>
                                                                        <div className="text-sm font-medium text-gray-700">الدورية</div>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="visitePeriodicitee"
                                                                        name="periodicitee"
                                                                        value={visiteFormValues.periodicitee}
                                                                        onChange={handleVisiteInputChange}
                                                                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
                                                                    />
                                                                </div>
                                                            </>
                                                        )}
                                                        {tab.formType === "assurance" && (
                                                            <>
                                                                <div className="mb-4">
                                                                    <label htmlFor="assuranceDate" className="flex mb-2 justify-between">
                                                                        <div className="text-sm font-medium text-gray-700">Date Revision</div>
                                                                        <div className="text-sm font-medium text-gray-700">تاريخ المعاينة</div>
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        id="assuranceDate"
                                                                        name="date"
                                                                        value={assuranceFormValues.date}
                                                                        onChange={handleAssuranceInputChange}
                                                                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label htmlFor="assuranceSociete" className="flex mb-2 justify-between">
                                                                        <div className="text-sm font-medium text-gray-700">Societe</div>
                                                                        <div className="text-sm font-medium text-gray-700">شركة التأمين</div>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="assuranceSociete"
                                                                        name="societe"
                                                                        value={assuranceFormValues.societe}
                                                                        onChange={handleAssuranceInputChange}
                                                                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label htmlFor="assurancePeriodicitee" className="flex mb-2 justify-between">
                                                                        <div className="text-sm font-medium text-gray-700">Périodicité</div>
                                                                        <div className="text-sm font-medium text-gray-700">الدورية</div>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="assurancePeriodicitee"
                                                                        name="periodicitee"
                                                                        value={assuranceFormValues.periodicitee}
                                                                        onChange={handleAssuranceInputChange}
                                                                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
                                                                    />
                                                                </div>

                                                            </>
                                                        )}

                                                        {/* Submit button */}
                                                        <button
                                                            type="submit"
                                                            className="mt-4 px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
                                                        >
                                                            Submit
                                                        </button>
                                                    </form>
                                                </Transition>
                                            </Tab.Panel>
                                        ))}
                                    </div>
                                </Tab.Panels>
                            </div>
                        )}
                    </Tab.Group>
                </>
            ) : (<>
                Loading...
            </>)}
        </>

    )
}