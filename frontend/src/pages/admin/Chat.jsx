import { useCallback, useEffect, useState } from "react";
import socket from "../../services/socket";
import { useAppContext } from "../../context/AppContext";
import { useQuery } from "react-query";
import * as authAPI from "../../api/authentication";

const Chat = () => {
  const { auth } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [selectedChat, setSelectedChat] = useState();
  const { data: contacts } = useQuery(["users"], authAPI.getAllUsers);

  useEffect(() => {
    socket.on("connect", (socket) => {
      console.log("Connected Frontend");
    });
  }, []);

  useEffect(() => {
    if (selectedChat) socket.emit("join room", selectedChat._id);
  }, [selectedChat]);

  useEffect(() => {
    if (auth) {
      socket.on("receive message", ({ content, from, to }) => {
        // sebelumnya bug selectedChat kosong, ini karena kita tidak melakukan pengecekan selectedChat yang diinisiasi sebagai state kosong. hal ini yang berakibat error.
        if (selectedChat && selectedChat._id === to) {
          if (from === "admin")
            setMessages([...messages, { content: content, sender: "You" }]);
          else
            setMessages([
              ...messages,
              { content: content, sender: selectedChat.username },
            ]);
        }
      });
    }
  });

  const selectChat = (contact) => {
    setSelectedChat(contact);
    socket.emit("join room", contact._id);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    socket.volatile.emit("send message", {
      content: message,
      from: "admin",
      to: selectedChat._id,
    });
  };

  const typeMessage = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", {
      from: "admin",
      to: selectedChat._id,
      bool: true,
    });

    setTimeout(() => {
      socket.emit("typing", {
        from: "admin",
        to: selectedChat._id,
        bool: false,
      });
    }, 4000);
    stopType();
  };

  return (
    <div className="flex bg-slate-50 w-full h-[90%] gap-2 rounded-lg">
      <div className="flex flex-1 flex-col py-5 px-2">
        <h1 className="font-bold text-lg ms-4">Contact List</h1>
        <div className="mt-1 flex flex-col overflow-y-auto px-2 gap-2">
          {contacts &&
            contacts.map((contact, idx) => (
              <div
                className={`flex gap-3 text-gray-600  text-sm p-2 rounded-md border ${
                  selectedChat && selectedChat._id === contact._id
                    ? "bg-slate-200"
                    : "bg-white"
                }`}
                key={idx}
                onClick={() => selectChat(contact)}
              >
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
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
                  </div>
                </span>
                <p className="leading-relaxed">
                  <span className="block font-bold text-gray-700">
                    {contact.username}
                  </span>
                  halo
                </p>
              </div>
            ))}
        </div>
      </div>
      {/* Chat Section */}

      <div
        style={{
          boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
        }}
        className="flex flex-1 flex-col bg-white rounded-lg w-full h-full p-5 "
      >
        {selectedChat ? (
          <>
            {/* Heading */}
            <div className="flex flex-col space-y-1.5 pb-0">
              <h2 className="font-semibold text-lg tracking-tight">
                {selectedChat.username}
              </h2>
              <p className="text-sm text-[#6b7280] leading-3">
                Ask your question here!
              </p>
            </div>

            {/* Chat Messages */}
            <div className="flex flex-col overflow-y-auto my-4">
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
                      {idx > 0 &&
                      messages.at(idx - 1).sender === message.sender ? (
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
                              {message.sender === "admin" ? (
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
                  onChange={typeMessage}
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
          </>
        ) : (
          <div className="flex bg-slate-50 w-full h-full">
            <h1 className="text-xl m-auto">Start Chat!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
