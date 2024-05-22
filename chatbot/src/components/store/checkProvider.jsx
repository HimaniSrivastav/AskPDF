// CheckContext.js
import { createContext, useState } from "react";

const CheckContext = createContext();

const CheckProvider = ({ children }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [inputText, setInputText] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [generateData, setGenerateData] = useState(false);

  return (
    <CheckContext.Provider
      value={{
        fileUploaded,
        setFileUploaded,
        inputText,
        setInputText,
        uploading,
        setUploading,
        fileName,
        setFileName,
        generateData,
        setGenerateData,
      }}
    >
      {children}
    </CheckContext.Provider>
  );
};

export { CheckContext, CheckProvider };
