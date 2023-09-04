'use client'
import "./new.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import KioskBoard from 'kioskboard';
import { useEffect, useRef, useState } from "react";
import { userInput } from "../formSource";
import { useRouter } from "next/navigation";
import { createClient2, uploadFile } from "@/utils/supabase";
import "react-simple-keyboard/build/css/index.css";
import Image from "next/image";
import Select from 'react-select';
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const New = () => {
  const supabase = createClientComponentClient()

  const [file, setFile] = useState("");
  const [clientData, setClientData] = useState({});
  const [sexe, setSexe] = useState("homme");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const [frenshlastNameInput, setFrenshLastNameInput] = useState("");
  const [frenshfirstNameInput, setFrenshFirstNameInput] = useState("");
  const [frenshAdresseInput, setFrenshAdresseInput] = useState("");
  const [frenshVilleInput, setFrenshVilleInput] = useState("");
  const firstNameKeyboard = useRef(null);
  const lastNameKeyboard = useRef(null);
  const keyboardRef = useRef(null);
  const VilledRef = useRef(null);
  const [moniteurs, setMoniteurs] = useState([]);
  const [selectedMoniteur, setSelectedMoniteur] = useState(null);

  const [pratiqueMoniteurs, setPratiqueMoniteurs] = useState([]);
  const [theoriqueMoniteurs, setTheoriqueMoniteurs] = useState([]);
  const [selectedPratiqueMoniteur, setSelectedPratiqueMoniteur] = useState(null);
  const [selectedTheoriqueMoniteur, setSelectedTheoriqueMoniteur] = useState(null);

  const setupKioskBoard = (inputRef) => {
    if (inputRef.current) {
      KioskBoard.run(inputRef.current, {
        language: "en",
        theme: "light",
        keysAllowSpacebar: false,
        allowRealKeyboard: true,
        allowMobileKeyboard: true,
        keysArrayOfObjects: [
          {
            "0": "د",
            "1": "ج",
            "2": "ح",
            "3": "خ",
            "4": "ه",
            "5": "ع",
            "6": "غ",
            "7": "ف",
            "8": "ق",
            "9": "ث",
            "10": "ص",
            "11": "ض"
          },
          {
            "0": "ط",
            "1": "ك",
            "2": "م",
            "3": "ن",
            "4": "ت",
            "5": "ا",
            "6": "ل",
            "7": "ب",
            "8": "ي",
            "9": "س",
            "10": "ش"
          },
          {
            "0": "ظ",
            "1": "ز",
            "2": "و",
            "3": "ة",
            "4": "ى",
            "5": "لا",
            "6": "ر",
            "7": "ؤ",
            "8": "ء",
            "9": "ئ"
          }
        ]

      });

    }
  };
  useEffect(() => {
    fetchMoniteurs();
  }, []);

  useEffect(() => {
    fetchMoniteurs('pratique');
    fetchMoniteurs('theorique');
  }, []);

  const fetchMoniteurs = async (category) => {
    try {
      const { data: moniteurs, error } = await supabase
        .from('moniteurs')
        .select('*')
        .eq(category, true);
      if (error) {
        throw new Error(`Error fetching ${category} moniteurs.`);
      }

      if (category === 'pratique') {
        setPratiqueMoniteurs(moniteurs);
      } else if (category === 'theorique') {
        setTheoriqueMoniteurs(moniteurs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createOptions = (moniteurs) => {
    return moniteurs.map((moniteur) => ({
      value: moniteur.id,
      label: `${moniteur.nom} ${moniteur.prenom}`,
    }));
  };

  const handlePratiqueChange = (selectedOption) => {
    setSelectedPratiqueMoniteur(selectedOption);
  };

  const handleTheoriqueChange = (selectedOption) => {
    setSelectedTheoriqueMoniteur(selectedOption);
  };

  useEffect(() => {
    setupKioskBoard(keyboardRef);
    setupKioskBoard(firstNameKeyboard);
    setupKioskBoard(lastNameKeyboard);
    setupKioskBoard(VilledRef);
    
  }, [keyboardRef, firstNameKeyboard, lastNameKeyboard,VilledRef]);
  const handleFrenshAdresse = (e) => {
    setFrenshAdresseInput(e.target.value);
  };



  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSexe = (e) => {
    setSexe(e.target.value);
  };
  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientName = clientData['nom'];
      const arabicLastName = lastNameKeyboard.current.value;
      const arabicFirstName = firstNameKeyboard.current.value;
      const arabicAdresse = keyboardRef.current.value;
      const arabic_ville = VilledRef.current.value;
      const filename = `${uuidv4()}`;
      const { data1, error } = await supabase.storage.from('machmech').upload(filename, file)
      const data = {
        ...clientData,
        Adresse: frenshAdresseInput,
        nom: frenshlastNameInput,
        prenom: frenshfirstNameInput,
        image:filename,
        arabic_prenom: arabicFirstName,
        arabic_nom: arabicLastName,
        arabic_adresse: arabicAdresse,
        arabic_ville:arabic_ville,
        ville:frenshVilleInput,
        sexe: sexe,
        category: category,
        moniteur_pratique: selectedPratiqueMoniteur.value,
        moniteur_theorique: selectedTheoriqueMoniteur.value
      };
      const response = await createClient2(data);
      console.log("Client created successfully", response);
      router.push('/');
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Ajouter un condidat</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <Image
              height={50}
              width={50}
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://www.icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image : <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="grid grid-cols-6 gap-4 p-4">
                <div className="col-span-3">
                  <div className='flex flex-col md:flex-row md:space-x-2'>
                    <div className="md:w-1/4 flex">
                      <label className="block font-bold text-md text-gray-900 dark:text-gray-300 self-center">
                        Prenom:
                      </label>
                    </div>

                    <div className="md:w-3/4 flex">
                      <input
                        type="text"
                        placeholder="Prenom"
                        onChange={(e) => setFrenshFirstNameInput(e.target.value)}
                        value={frenshfirstNameInput}
                        className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-3 md:flex md:flex-col md:space-y-4 md:items-center md:justify-end">
                  <div className="col-span-3">
                    <div className='flex flex-col md:flex-row md:space-x-2'>
                      <div className="md:w-3/4 flex">
                        <input
                          className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                          ref={firstNameKeyboard}
                          type="text"
                          data-kioskboard-type="keyboard"
                          placeholder="الاسم الشخصي"
                          required
                        />
                      </div>
                      <div className="md:w-1/4 flex">
                        <label className="font-bold text-md text-gray-900 dark:text-gray-300 md:mb-0 md:mt-2">
                          : الاسم الشخصي
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4 p-4">
                <div className="col-span-3">
                  <div className='flex flex-col md:flex-row md:space-x-2'>
                    <div className="md:w-1/4 flex">
                      <label className="block font-bold text-md text-gray-900 dark:text-gray-300 self-center">
                        Nom:
                      </label>
                    </div>

                    <div className="md:w-3/4 flex">
                      <input
                        type="text"
                        onChange={(e) => setFrenshLastNameInput(e.target.value)}
                        value={frenshlastNameInput}
                        placeholder="Nom"
                        className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-3 md:flex md:flex-col md:space-y-4 md:items-center md:justify-end">
                  <div className="col-span-3">
                    <div className='flex flex-col md:flex-row md:space-x-2'>
                      <div className="md:w-3/4 flex">
                        <input
                          className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                          ref={lastNameKeyboard}
                          type="text"
                          data-kioskboard-type="keyboard"
                          placeholder="الاسم العائلي"
                          required
                        />
                      </div>
                      <div className="md:w-1/4 flex">
                        <label className="font-bold text-md text-gray-900 dark:text-gray-300 md:mb-0 md:mt-2">
                          : الاسم العائلي
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4 p-4">
                <div className="col-span-3">
                  <div className='flex flex-col md:flex-row md:space-x-2'>
                    <div className="md:w-1/4 flex">
                      <label className="block font-bold text-md text-gray-900 dark:text-gray-300 self-center">
                        Ville:
                      </label>
                    </div>

                    <div className="md:w-3/4 flex">
                      <input
                        type="text"
                        onChange={(e) => setFrenshVilleInput(e.target.value)}
                        value={frenshVilleInput}
                        placeholder="Ville"
                        className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-3 md:flex md:flex-col md:space-y-4 md:items-center md:justify-end">
                  <div className="col-span-3">
                    <div className='flex flex-col md:flex-row md:space-x-2'>
                      <div className="md:w-3/4 flex">
                        <input
                          className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                          ref={VilledRef}
                          type="text"
                          data-kioskboard-type="keyboard"
                          placeholder="المدينة"
                          required
                        />
                      </div>
                      <div className="md:w-1/4 flex">
                        <label className="font-bold text-md text-gray-900 dark:text-gray-300 md:mb-0 md:mt-2">
                          : المدينة
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4 p-4">
                <div className="col-span-3">
                  <div className='flex flex-col md:flex-row md:space-x-2'>
                    <div className="md:w-1/4 flex">
                      <label className="block font-bold text-md text-gray-900 dark:text-gray-300 self-center">
                        Adresse:
                      </label>
                    </div>

                    <div className="md:w-3/4 flex">
                      <textarea
                        onChange={handleFrenshAdresse}
                        value={frenshAdresseInput}
                        name="adresse"
                        rows="8"
                        placeholder="adresse"
                        required
                        className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-span-3 md:flex md:flex-col md:space-y-4 md:items-center md:justify-end">
                  <div className="col-span-3">
                    <div className='flex flex-col md:flex-row md:space-x-2'>
                      <div className="md:w-3/4 flex">
                        <textarea
                          className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                          ref={keyboardRef}
                          type="text"
                          data-kioskboard-type="keyboard"
                          name="adresse"
                          rows="8"
                          placeholder="العنوان"
                          required
                        ></textarea>
                      </div>
                      <div className="md:w-1/4 flex">
                        <label className="font-bold text-md text-gray-900 dark:text-gray-300 md:mb-0 md:mt-2">
                          :العنوان
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
              <div className="formInput">

                <label>Select a Pratique Moniteur:</label>
                <Select
                  options={createOptions(pratiqueMoniteurs)}
                  value={selectedPratiqueMoniteur}
                  onChange={handlePratiqueChange}
                  isClearable={true}
                />
                </div>
                <div className="formInput">

                  <label>Select a Theorique Moniteur:</label>
                  <Select
                    options={createOptions(theoriqueMoniteurs)}
                    value={selectedTheoriqueMoniteur}
                    onChange={handleTheoriqueChange}
                    isClearable={true}
                  />
                </div>

              </div>
              {userInput.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.title}</label>
                  <input
                    name={input.label}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="formInput">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category :
                </label>
                <select
                  id="category"
                  onChange={handleCategory}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="AM">AM</option>
                  <option value="A1">A1</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="EB">EB</option>
                  <option value="EC">EC</option>
                  <option value="ED">ED</option>
                </select>
              </div>
              <div className="formInput">
                <label
                  htmlFor="sexe"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sexe :
                </label>
                <select
                  id="sexe"
                  onChange={handleSexe}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
              <div className="buttonContainer">
                <button className="button">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
