import{ useState } from "react";
import axios from 'axios';
const FileInputComponent = () => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('pdf', file);
        await axios.post('http://localhost:8000/upload-pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setIsUploading(false);
        alert('PDF uploaded successfully!');
      } catch (error) {
        console.error('Error uploading PDF:', error);
        setIsUploading(false);
        alert('Failed to upload PDF.');
      }
    } else {
      alert('Please upload a PDF file.');
    }
  };

  return (
    <div className="flex items-center">
      
      <div className="relative inline-block">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
        />
        <div className="flex items-center justify-center px-3 py-2 border border-gray-400 rounded-md shadow text-sm font-semibold text-gray-700 hover:border-black active:bg-gray-100">
          Upload Pdf
        </div>
      </div>
    </div>
  );
};

export default FileInputComponent;
