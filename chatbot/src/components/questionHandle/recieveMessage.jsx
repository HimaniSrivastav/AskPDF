import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Logo from "../../assets/logo2.png";
import userLogo from "../../assets/userLogo.png";
import { CheckContext } from "../store/checkProvider";
import { PiPaperPlaneRightBold } from "react-icons/pi";

function Messages() {
  const {
    fileUploaded,
    inputText,
    setInputText,
    generateData,
    setGenerateData,
  } = useContext(CheckContext);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    };

    // Initial scroll to the bottom
    scrollToBottom();

    // Scroll to the bottom when new content is added
    const observer = new MutationObserver(scrollToBottom);
    observer.observe(scrollContainerRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  const sendMessage = async () => {
    setGenerateData(true);
    setMessage("");
    setInputText(false);
    try {
      const response = await axios.post("http://localhost:8000/messages", {
        sentence: message,
      });

      const newMessage = {
        inputMessage: message,
        apiResponse: response.data.message,
      };

      setMessagesList([...messagesList, newMessage]);
      setMessage(""); // Clear the input field after sending the message
      setInputText(true);
      setGenerateData(false);
    } catch (error) {
      console.error("There was an error sending the message!", error);

      const newMessage = {
        inputMessage: message,
        apiResponse: "Error sending message",
      };

      setMessagesList([...messagesList, newMessage]);
      // Clear the input field after sending the message
      setInputText(true);
    }
  };

  return (
    <div className="container mx-auto w-[90%] sm:w-[80%] flex flex-col justify-between h-[44em] px-0 sm:px-[5%]">
      <div
        className=" h-[100%] py-[1em] overflow-y-scroll scrollbar-hide mb-4"
        ref={scrollContainerRef}
      >
        {messagesList.map((msg, index) => (
          <div key={index} className="mb-4 pb-1">
            <p className="my-[1em] flex flex-row gap-4 items-center">
              <img src={userLogo} alt="aiLogo" />
              <strong> {msg.inputMessage}</strong>
            </p>
            <p className="my-[1em] flex flex-row gap-4 ">
              <img src={Logo} alt="aiLogo" className="h-full" />{" "}
              {msg.apiResponse}
            </p>
          </div>
        ))}
        {generateData && (
          <div className="px-4 mx-auto py-2 h-[50px] gap-1 bg-gray-100 w-[150px] flex justify-center items-center">
            <p>Generating...</p>
            <div className="loader2"></div>
          </div>
        )}
      </div>
      <div className="flex mb-4 h-[40px] gap-[0] bg-gray-100 shadow-md ">
        <input
          className="flex-1 px-4 py-2 border-none rounded-md"
          type="text"
          value={message}
          disabled={!fileUploaded || !inputText}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          onKeyDown={handleKeyDown}
        />
        <button
          className="px-4 py-2 hover:bg-gray-200 text-[#25b09d] rounded-md"
          onClick={sendMessage}
        >
          <PiPaperPlaneRightBold />
        </button>
      </div>
    </div>
  );
}

export default Messages;
