import { useContext} from "react";
import axios from "axios";
import "../../index.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CheckContext } from "../store/checkProvider";

const FileInputComponent = () => {
  const { setFileUploaded, uploading, setUploading, setFileName } =
    useContext(CheckContext);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("pdf", file);
        await axios.post("http://localhost:8000/upload-pdf", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFileName(file.name);
        setUploading(false);
        setFileUploaded(true);
      } catch (error) {
        console.error("Error uploading PDF:", error);
        setUploading(false);
        alert("Failed to upload PDF.");
      }
    } else {
      alert("Please upload a PDF file.");
    }
  };

  return (
    <div className="flex items-center cursor-pointer gap-1">
      <div className="relative h-full w-[40px] sm:w-[170px]">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex items-center justify-center px-1 sm:px-3 py-2 gap-1 border border-[#25b09d] h-[30px] rounded-md shadow text-sm font-semibold text-gray-700 hover:border-black cursor-pointer active:bg-gray-100">
          {uploading ? (
            <div className="loader"></div>
          ) : (
            <IoIosAddCircleOutline className="w-[25px] h-[25px] text-[#25b09b]" />
          )}
          {!uploading ? (
            <p className="text-[#25b09d] text-sm sm:text-base hidden sm:block">
              Upload Pdf
            </p>
          ) : (
            <p className="text-[#25b09d] text-sm sm:text-base hidden sm:block">
              Uploading Pdf
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileInputComponent;
