import React, { MutableRefObject, useRef } from "react";
import { UPLOAD_BLOG } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Upload = () => {
  const navigate = useNavigate();
  const title: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const description: MutableRefObject<HTMLTextAreaElement | null> =
    useRef(null);

  const submitBlog = async () => {
    const data = await fetch(UPLOAD_BLOG, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.current?.value,
        description: description.current?.value,
      }),
    });
    const json = await data.json();

    if (json.message == "Blog Created") {
      navigate("/dashboard");
    }
  };

  return (
    <div className=" bg-yellow-200 h-screen">
      <Header />
      <div className="w-full flex justify-center items-center mt-4 ">
        <input
          ref={title}
          type="text"
          placeholder="Title"
          className="border  bg-yellow-100 font-black border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 resize-none w-3/4 h-20"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <textarea
          ref={description}
          className="border  bg-yellow-100 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 resize-none w-3/4 h-40"
          placeholder="Type your Blog here.."
        ></textarea>
        <button
          onClick={submitBlog}
          className="w-3/4 py-2 border border-back-400 bg-green-400 font-bold rounded-lg mt-5"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
