import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { GET_ALL_BLOGS, GET_USER_BLOGS } from "../utils/constants";

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    gettAllBlogs();
  }, []);

  const gettAllBlogs = async () => {
    const data = await fetch(GET_ALL_BLOGS, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const json = await data.json();
    setAllBlogs(json.blogs);
  };

  const filterblogs = async () => {
    const data = await fetch(GET_USER_BLOGS, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const json = await data.json();
    setFilter(!filter);
    if (!filter) setAllBlogs(json.blogs);
    else gettAllBlogs();
  };

  return (
    <div className="flex content-center items-center flex-col">
      <button
        onClick={() => {
          filterblogs();
        }}
        className={`border px-2 py-1 border-black mt-2 rounded-lg ${
          filter ? `bg-blue-400` : ``
        }`}
      >
        Show Only Mine
      </button>
      <div className=" flex flex-col-reverse mt-5">
        {allBlogs.map((blog) => (
          <BlogCard data={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
