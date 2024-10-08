import React, { useState } from "react";
import { useEffect } from "react";
import socket from "../services/socket";
import { useAppContext } from "../context/AppContext";

const ChatBox = () => {
  const { auth } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    socket.on("connect", (socket) => {
      console.log("Connected Frontend");
    });
  }, []);

  useEffect(() => {
    if (auth) {
      socket.emit("join room", auth.userId);
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      socket.on("receive message", ({ content, from, to }) => {
        console.log(content, from, to);
        if (to === auth.userId) {
          if (from === "admin")
            setMessages([...messages, { content: content, sender: "Admin" }]);
          else setMessages([...messages, { content: content, sender: "You" }]);
        }
      });
    }
  });

  useEffect(() => {
    if (auth) {
      socket.on("is typing", ({ from, to, bool }) => {
        if (to === auth.userId) {
          bool == true ? setIsTyping(true) : setIsTyping(false);
        }
      });
    }
  });

  const sendMessage = (e) => {
    e.preventDefault();
    socket.volatile.emit("send message", {
      content: message,
      from: auth.userId,
      to: auth.userId,
    });
    setMessage("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 cursor-pointer border-gray-200 p-0 leading-5"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-yellow-400 block border-gray-200 align-middle"
        >
          <path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
          }}
          className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-4 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
        >
          {/* Heading */}
          <div className="flex flex-col space-y-1.5 pb-3">
            <h2 className="font-semibold text-lg tracking-tight">
              Admin{" "}
              {isTyping && (
                <span className="ms-1 text-sm text-yellow-500">
                  is typing . . .
                </span>
              )}
            </h2>
            <p className="text-sm text-[#6b7280] leading-3">
              Ask your question here!
            </p>
          </div>

          {/* Chat Messages */}
          <div
            className="pr-4 h-[474px]"
            style={{ minWidth: "100%", display: "table" }}
          >
            {/* User Message */}
            {messages &&
              messages.map((message, idx) => (
                <div
                  className="flex gap-3 text-gray-600 text-sm flex-1"
                  key={idx}
                >
                  {idx > 0 && messages.at(idx - 1).sender === message.sender ? (
                    <div className="flex gap-2">
                      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 ">
                        <div className="rounded-full bg-gray-100 border hidden "></div>
                      </span>
                      <div className="leading-relaxed ">
                        <div className="flex flex-col ">
                          <p>{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 flex gap-2">
                      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                        <div className="rounded-full bg-gray-100 border p-1">
                          {message.sender === "Admin" ? (
                            <svg
                              stroke="none"
                              fill="black"
                              strokeWidth="1.5"
                              viewBox="0 0 19 24"
                              aria-hidden="true"
                              height="20"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              stroke="none"
                              fill="black"
                              strokeWidth="0"
                              viewBox="0 0 16 16"
                              height="20"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                            </svg>
                          )}
                        </div>
                      </span>
                      <div className="leading-relaxed">
                        <span className="block font-bold text-gray-700">
                          {message.sender}{" "}
                        </span>

                        <div className="flex flex-col">
                          <p>{message.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center pt-0">
            <form
              className="flex items-center justify-center w-full space-x-2"
              onSubmit={sendMessage}
            >
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-yellow-300 disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
