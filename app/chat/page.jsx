"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TbPdf } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { IoSend } from "react-icons/io5";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const bottomOfMessagesRef = useRef();
  const [messageHistory, setMessageHistory] = useState([
    {
      message: "Ask me anything about the pdf that you uploaded",
      author: "Server",
    },
  ]);

  useEffect(() => {
    if (bottomOfMessagesRef.current) {
      bottomOfMessagesRef.current.scrollIntoView();
    }
  }, [messageHistory]);

  const sendMessage = async () => {
    console.log(message);
    const messageObj = {
      message: message,
      author: "User",
    };
    // if (messageHistory.length === 0) {
    //   setMessageHistory([messageObj]);
    // }

    setMessageHistory((messageHistory) => [...messageHistory, messageObj]);
    setMessage("");
    const result = await axios.post(
      "https://talktopdf-backend.onrender.com/sendMessage",
      { message },
      {
        withCredentials: true,
      }
    );
    if (result) {
      const messageObj = {
        message: result.data.message,
        author: "Server",
      };
      setMessageHistory((messageHistory) => [...messageHistory, messageObj]);
      console.log(messageHistory);
    }

    console.log(result);
  };

  return (
    <div className="h-full">
      {/* <div>Hello</div>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button> */}
      <div className=" flex flex-col">
        <div className="mb-24 mt-2">
          {messageHistory.map((message) => {
            return (
              <div>
                {message.author === "Server" && (
                  <div className="flex gap-x-2 justify-start w-3/4 my-3 mx-6 ">
                    <div>
                      <TbPdf
                        style={{
                          color: "white",
                          fontSize: "35px",

                          padding: "6px",
                          borderRadius: "50%",
                        }}
                        className="bg-green-400"
                      />
                    </div>
                    <div className="bg-gray-300 p-2 px-4 rounded-md">
                      {" "}
                      {message.message}
                    </div>
                  </div>
                )}
                {message.author === "User" && (
                  <div className="flex items-center gap-x-2 justify-end my-3 mx-6">
                    <div className="bg-blue-300 py-2 px-4 rounded-md">
                      {message.message}
                    </div>
                    <div>
                      <CiUser
                        style={{
                          color: "white",
                          fontSize: "35px",

                          padding: "6px",
                          borderRadius: "50%",
                        }}
                        className="bg-purple-400"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div ref={bottomOfMessagesRef}></div>
        </div>
        <div className="fixed px-4 py-6 flex bottom-0 w-full bg-white">
          <div className="flex border-blue-400 border-2 p-2 w-full rounded-md">
            <input
              type="text"
              className="w-full  outline-none"
              placeholder="Ask any question"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button className="px-4" onClick={sendMessage}>
              <IoSend className="text-blue-500 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
