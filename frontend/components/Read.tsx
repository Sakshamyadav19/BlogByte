import React, { useEffect, useState } from "react";
import { GET_BLOG } from "../utils/constants";
import { useParams } from "react-router-dom";
interface Blog {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  };
  description: string;
}

const Read = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>();

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    const data = await fetch(GET_BLOG + "?id=" + id, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const json = await data.json();
    setBlog(json.blog);
  };
  if (!blog) return <h1>Loading!!!!</h1>;

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="w-3/4 border border-black px-2">
        <div className=" text-5xl">{blog.title}</div>
        <div className="py-3 border-b-2">
          {"Written By- " + blog.author.name}
        </div>
        <div className="p-2 text-xl whitespace-pre-wrap">
          {blog.description}
        </div>
      </div>
    </div>
  );
};

export default Read;
