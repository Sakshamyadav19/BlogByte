import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ data }: any) => {
  const words = data.description.split(" ");

  // Take the first 20 words and join them back into a string
  const shortDesc = words.slice(0, 50).join(" ");
  return (
    <div className="flex justify-center items-center border-b-2 border-black hover:bg-yellow-400">
      <div className="w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center text-white font-bold text-xl">
        {data.author.name.toUpperCase()[0]}
      </div>
      <div className=" w-1/2 ">
        <div className="p-4 font-bold underline">{data.title}</div>
        <div className="p-4">
          {shortDesc + "....."}
          <Link to={"/read/" + data.id}>
            <span className=" underline text-blue-500">Read More</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
