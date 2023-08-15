'use client'
import React, { useRef, useState } from "react";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { userInput } from "../formSource";
import { createClient2, uploadFile } from "@/utils/supabase"; // Update the import path
import './new.scss'
import { useRouter } from "next/navigation";
import KeyboardIcon from '@mui/icons-material/Keyboard';

import ArabicVirtualKeyboard from "@/components/arabicKeyboard/keyboard";
const New = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState("");
  const [clientData, setClientData] = useState({});
  const [adresse, setAdresse] = useState("")
  const router = useRouter();

  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef();

  const handleToggleKeyboard = () => {
    setShowKeyboard((prevShowKeyboard) => !prevShowKeyboard);
  };
  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };


  const handleAdresse = (e) => {
    setAdresse(e.target.value);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientName = clientData['nom'];
      const data2 = await uploadFile(file, clientName)
      const data = { ...clientData, Adresse: adresse, image_url: data2.path };
      const response = await createClient2(data);
      console.log("Client created successfully", response);
      router.replace('/clients')
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step">
            <div className="formInput">
              <label htmlFor="file">
                Image : <DriveFolderUploadOutlined className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            {/* Additional fields for step 1 */}
          </div>
        );
      case 2:
        return (
          <div className="step">
            {userInput.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.title}</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.label}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="step">
            {/* Additional fields for step 3 */}
         

            {/* Input element */}
            <div >
            <label>ايسيتشيس</label>
              {/* Input field and keyboard icon */}
              <div className="input-container">
                <input ref={inputRef} />
                <button onClick={handleToggleKeyboard} className="keyboard-icon-btn">
                  <KeyboardIcon />
                </button>
              </div>


              {/* Render the virtual Arabic keyboard */}
              {showKeyboard && (
                <ArabicVirtualKeyboard
                  showKeyboard={showKeyboard}
                  inputRef={inputRef}
                />
              )}
            </div>
            {/* Checkbox options */}
          </div>
        );
      case 4:
        return (
          <div className="step">
            <label >ADRESSE :</label>
            <textarea
              onChange={handleAdresse}
              name="adresse"
              rows="8"
              placeholder="Hay Mabrouka av anoual n 139"

            ></textarea>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          {/* Step indicator */}
          <div className="stepIndicator">
            Step {step} of 4
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : "https://www.icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="buttonContainer">
                {step !== 1 && (
                  <button type="button" onClick={handlePrevStep}>Previous</button>
                )}
                {step !== 4 ? (
                  <button type="button" onClick={handleNextStep}>Next</button>
                ) : (
                  <button type="submit">Send</button>
                )}
              </div>
              {renderStep()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
