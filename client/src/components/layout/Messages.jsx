import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";

const Messages = () => {
  const authCon = useContext(AuthContext);
  const { loadUser, getComplain, sendMessage, complain } = authCon;

  const [messageContent, setMessageContent] = useState({
    messageText: "",
  });

  const changing = (e) =>
    setMessageContent({ ...messageContent, [e.target.name]: e.target.value });

  const { id } = useParams();

  useEffect(() => {
    loadUser();

    setTimeout(() => getComplain(id), 2000);
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <div className="flex justify-center gap-20 mt-28">
        <div className="btns">
          <button className="make bg-greeny text-white py-2 text-sm w-40 block mb-6">
            Add Administrator
          </button>
        </div>
        <div className="main_message max-w-[500px] h-[70vh] relative">
          <div className="top rounded-t-md bg-greeny h-16 p-2 text-sm text-white">
            <div className="issue">{complain && complain.complainText}</div>
          </div>
          <div className="messages mt-4">
            <div>
              <div className="sent  text-[11px] w-3/5 mb-4 bg-greeny p-2 rounded-[10px] text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                esse aperiam vero quae laborum qui deleniti maiores incidunt ex
                iusto.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="receive text-[11px] w-3/5 mb-4 bg-greeny/10 p-2 rounded-[10px] text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                esse aperiam vero quae laborum qui deleniti maiores incidunt ex
                iusto.
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="h-12">
            <form
              action=""
              className="grid grid-cols-messageGrid gap-2 items-center p-4 bg-gray-100 absolute bottom-0 w-full"
              onSubmit={() => sendMessage(id, messageContent)}
            >
              <input
                type="text"
                className="bg-greeny/30 rounded-[20px] outline-none text-sm px-8 py-2"
                placeholder="Type your message here"
                onChange={changing}
              />

              <button
                type="submit"
                className="bg-greeny rounded-[50%] w-full h-[40px]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  <path
                    d="M4.80057 13.0003H11.5506M9.88807 3.28779L20.5881 8.63779C25.3881 11.0378 25.3881 14.9628 20.5881 17.3628L9.88807 22.7128C2.68807 26.3128 -0.249426 23.3628 3.35057 16.1753L4.43807 14.0128C4.71307 13.4628 4.71307 12.5503 4.43807 12.0003L3.35057 9.82529C-0.249426 2.63779 2.70057 -0.31221 9.88807 3.28779Z"
                    stroke="white"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
