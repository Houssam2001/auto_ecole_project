import React, { useState ,useEffect} from "react";
import "./VirtualKeyboard.scss"; // Import your CSS for styling

const ArabicVirtualKeyboard = ({ showKeyboard, inputRef }) => {
  const [textInput, setTextInput] = useState("");
  const [keyboardLayout, setKeyboardLayout] = useState([
    // Initial keyboard layout
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح"],
    ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك"],
    ["ظ", "ط", "ذ", "د", "ز", "ر", "و", "ة", "ى", "ء"],
    ["Space", "Backspace"],
  ]);

  const handleKeyPress = (key) => {
    if (key === "Space") {
      setTextInput((prevText) => prevText + " ");
    } else if (key === "Backspace") {
      setTextInput((prevText) => prevText.slice(0, -1));
    } else {
      setTextInput((prevText) => prevText + key);
    }

    // Update the input value if inputRef is provided
    if (inputRef && inputRef.current) {
      inputRef.current.value = textInput;
    }
  };
  // useEffect(
  //     () => {
  //     // Update the keyboard layout based on the user's input
  //     const updateKeyboardLayout = () => {
  //       const arabicLetters = /[\u0600-\u06FF]/;
  //       const updatedLayout = [];
  
  //       for (const row of keyboardLayout) {
  //         const updatedRow = row.filter((key) => !arabicLetters.test(key));
  //         updatedLayout.push(updatedRow);
  //       }
  
  //       setKeyboardLayout(updatedLayout);
  //     };
  
  //     if (showKeyboard) {
  //       updateKeyboardLayout();
  //     }
  //   }, [showKeyboard]);

 

  return (
    <div className="virtual-keyboard">
      <div className="text-input">
        {/* <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        /> */}
      </div>
      <div className="keyboard">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key, keyIndex) => (
              <button
                key={keyIndex}
                className="keyboard-key"
                onClick={() => handleKeyPress(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArabicVirtualKeyboard;
