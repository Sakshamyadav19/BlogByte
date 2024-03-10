import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between px-2 py-3 border-black border-b-2">
      <h1 className="text-2xl">BlogByte</h1>
      <div className="flex">
        <Link
          to={"/upload"}
          className="border border-black px-2 py-1 rounded-lg bg-green-500 mr-5"
        >
          Upload
        </Link>
        <Link
          to={"/dashboard"}
          className="border border-black px-2 py-1 rounded-lg mr-5"
        >
          Home
        </Link>

        <button
          onClick={() => {
            handleLogout();
          }}
          className="border border-black px-2 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
