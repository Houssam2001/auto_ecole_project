// 'use client'
// import "./new.scss";
// import { DriveFolderUploadOutlined } from "@mui/icons-material";
// import { useEffect, useRef, useState } from "react";
// import { userInput } from "../formSource";
// import { useRouter } from "next/navigation";
// import { createClient2, uploadFile } from "@/utils/supabase";
// import Keyboard from "react-simple-keyboard";
// import "react-simple-keyboard/build/css/index.css";
// import Layout from "simple-keyboard-layouts/build/layouts/arabic";
// const New = () => {
//   const [file, setFile] = useState("");
//   const [step, setStep] = useState(1);
//   const [clientData, setClientData] = useState({});
//   const [adresse, setAdresse] = useState("")
//   const [sexe, setSexe] = useState("homme")
//   const [category, setCategory] = useState("")
//   const router = useRouter();
//   const [input, setInput] = useState("جون");
//   const [layout, setLayout] = useState("default");
//   const keyboard = useRef();

//   useEffect(() => {
//     keyboard.current.setInput(input);
//   }, [input]);

//   const onChange = input => {
//     setInput(input);
//     console.log("Input changed", input);
//   };

//   const handleShift = () => {
//     const newLayoutName = layout === "default" ? "shift" : "default";
//     setLayout(newLayoutName);
//   };

//   const onKeyPress = button => {
//     console.log("Button pressed", button);

//     if (button === "{shift}" || button === "{lock}") handleShift();
//   };

//   const onChangeInput = event => {
//     const input = event.target.value;
//     setInput(input);
//   };

//   const arabicLayout = {
//     default: [
//       "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
//       "{tab} ض ص ث ق ف غ ع ه خ ح ج چ",
//       "ش س ي ب ل ا ت ن م ك ظ ط ز",
//       "{lock} ؤ ر ذ د ە و ى ة {enter}",
//       "{shift} ، ئ , ؟ . /"
//     ],
//     shift: [
//       "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
//       "{tab} ض ص ث ق ف غ ع ه خ ح ج چ",
//       "ش س ي ب ل ا ت ن م ك ظ ط ز",
//       "{lock} ؤ ر ذ د ە و ى ة {enter}",
//       "{shift} ، ئ , ؟ . /"
//     ]
//   };
//   const handleAdresse = (e) => {
//     setAdresse(e.target.value);
//   }
//   const handleCategory = (e) => {
//     setCategory(e.target.value);
//   }
//   const handleSexe = (e) => {
//     setSexe(e.target.value);
//   }
//   const handleChange = (e) => {
//     setClientData({ ...clientData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const clientName = clientData['nom'];
//       // const data2 = await uploadFile(file, clientName)
//       const data = {
//         ...clientData, Adresse: adresse, sexe: sexe, category: category
//         //  image_url: data2.path 
//       };
//       const response = await createClient2(data);
//       console.log("Client created successfully", response);
//       router.push('/')
//     } catch (error) {
//       console.error("Error creating client:", error);
//     }
//   };

//   return (
//     <div className="new">
//       <div className="newContainer">
//         <div className="top">
//           <h1>Ajouter un condidat</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <Image
//               src={file ? URL.createObjectURL(file) : "https://www.icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
//           </div>
//           <div className="right">
//             <form onSubmit={handleSubmit}>
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image : <DriveFolderUploadOutlined className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={e => setFile(e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </div>
//               {userInput.map((input) => (
//                 <div className="formInput" key={input.id}>
//                   <label>{input.title}</label>
//                   <input
//                     name={input.label}
//                     type={input.type}
//                     placeholder={input.placeholder}
//                     onChange={handleChange}
//                     required />

//                 </div>
//               ))}
//               <div className="formInput">
//                 <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexe :</label>
//                 <select id="category"
//                   onChange={handleCategory}
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                   <option selected value="AM">AM</option>
//                   <option value="A1">A1</option>
//                   <option value="A">A</option>
//                   <option value="B">B</option>
//                   <option value="C">C</option>
//                   <option value="D">D</option>
//                   <option value="EB">EB</option>
//                   <option value="EC">EC</option>
//                   <option value="ED">ED</option>
//                 </select>
//               </div>
//               <div className="formInput">
//                 <label for="sexe" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexe :</label>
//                 <select id="sexe"
//                   onChange={handleSexe}
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                   <option selected value="homme">Homme</option>
//                   <option value="femme">Femme</option>
//                 </select>
//               </div>
//               <input
//                 value={input}
//                 placeholder={"Tap on the virtual keyboard to start"}
//                 onChange={onChangeInput}
//               />
//               <Keyboard
//                 keyboardRef={r => (keyboard.current = r)}
//                 layoutName={layout}
//                 layout={arabicLayout}
//                 onChange={onChange}
//                 onKeyPress={onKeyPress}
//               />
//               <div className="formInput">
//                 <label >ADRESSE :</label>
//                 <textarea
//                   onChange={handleAdresse}
//                   name="adresse"
//                   rows="8"
//                   placeholder="Hay Mabrouka av anoual n 139"
//                   required
//                 >
//                 </textarea>

//               </div>

//               <div className="buttonContainer">
//                 <button
//                   className="button"
//                 >Send</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default New
'use client'
import "./new.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { userInput } from "../formSource";
import { useRouter } from "next/navigation";
import { createClient2, uploadFile } from "@/utils/supabase";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Layout from "simple-keyboard-layouts/build/layouts/arabic";
import { BsEye } from "react-icons/bs";
import Image from "next/image";

const New = () => {
  const [file, setFile] = useState("");
  const [clientData, setClientData] = useState({});
  const [adresse, setAdresse] = useState("");
  const [sexe, setSexe] = useState("homme");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const [layout, setLayout] = useState("default");
  const [input, setInput] = useState("جون");

  const [showFirstNameKeyboard, setShowFirstNameKeyboard] = useState(false);
  const [showLastNameKeyboard, setShowLastNameKeyboard] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("جون");
  const [lastNameInput, setLastNameInput] = useState("دو");
  const [firstNameLayout, setFirstNameLayout] = useState("default");
  const [lastNameLayout, setLastNameLayout] = useState("default");
  const firstNameKeyboard = useRef();
  const lastNameKeyboard = useRef();


  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };


  const onKeyPress = (button) => {
    console.log("Button pressed", button);

    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const handleFirstNameInputChange = (input) => {
    setFirstNameInput(input);
  };

  const handleLastNameInputChange = (input) => {
    setLastNameInput(input);
  };

  const arabicLayout = {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} ض ص ث ق ف غ ع ه خ ح ج چ",
      "ش س ي ب ل ا ت ن م ك ظ ط ز",
      "{lock} ؤ ر ذ د ە و ى ة {enter}",
      "{shift} ، ئ , ؟ . /"
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} ض ص ث ق ف غ ع ه خ ح ج چ",
      "ش س ي ب ل ا ت ن م ك ظ ط ز",
      "{lock} ؤ ر ذ د ە و ى ة {enter}",
      "{shift} ، ئ , ؟ . /"
    ]
  };

  const handleAdresse = (e) => {
    setAdresse(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSexe = (e) => {
    setSexe(e.target.value);
  };
  const handleFirstNameInputCh = (e) => {
    setFirstNameInput(e.target.value)
  }
  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientName = clientData['nom'];
      const data = {
        ...clientData,
        Adresse: adresse,
        sexe: sexe,
        category: category,
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
                  Sexe :
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
              <div className="formInput">
                <label>الاسم العائلي:</label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="ادخل الاسم العائلي"
                  value={lastNameInput}
                  onChange={(e) => handleLastNameInputChange(e.target.value)}
                  onFocus={() => {
                    setShowLastNameKeyboard(true);
                  }}
                  required
                />
                <a
                  className="keyboard-key"
                  onClick={() => setShowLastNameKeyboard(!showLastNameKeyboard)}
                >
                  <BsEye />
                </a>
                {showLastNameKeyboard && (
                  <div>
                    <input
                      type="text"
                      value={lastNameInput}
                      onChange={() => { }}
                      onFocus={() => lastNameKeyboard.current.setInput(lastNameInput)}
                    />
                    <Keyboard
                      keyboardRef={(r) => (lastNameKeyboard.current = r)}
                      layoutName={lastNameLayout}
                      layout={arabicLayout}
                      onChange={handleLastNameInputChange}
                      onKeyPress={onKeyPress}
                    />
                  </div>
                )}
              </div>
              <div className="formInput">
                <label>الاسم الشخصي:</label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="ادخل الاسم الشخصي"
                  value={firstNameInput}
                  onChange={(e) => handleFirstNameInputChange(e.target.value)}
                  onFocus={() => setShowFirstNameKeyboard(true)}
                  required
                />
                <>
                  <a
                    className="keyboard-key"
                    onClick={() => setShowFirstNameKeyboard(!showFirstNameKeyboard)}
                  >
                    <BsEye />
                  </a>
                </>
                {showFirstNameKeyboard && (
                  <div>
                    <input
                      type="text"
                      value={firstNameInput}
                      onChange={() => { }}
                      onFocus={() => firstNameKeyboard.current.setInput(firstNameInput)}
                    />
                    <Keyboard
                      keyboardRef={(r) => (firstNameKeyboard.current = r)}
                      layoutName={firstNameLayout}
                      layout={arabicLayout}
                      onChange={handleFirstNameInputChange}
                      onKeyPress={onKeyPress}
                    />
                  </div>
                )}
              </div>
              <div className="formInput">
                <label>ADRESSE:</label>
                <textarea
                  onChange={handleAdresse}
                  name="adresse"
                  rows="8"
                  placeholder="Hay Mabrouka av anoual n 139"
                  required
                ></textarea>
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
