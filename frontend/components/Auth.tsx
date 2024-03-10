import { MutableRefObject, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [auth, setAuth] = useState(true);
  const navigate = useNavigate();
  const email:MutableRefObject<HTMLInputElement|null > = useRef(null);
  const name:MutableRefObject<HTMLInputElement|null >  = useRef(null);
  const password:MutableRefObject<HTMLInputElement|null >  = useRef(null);

  const handleAuth = async () => {
    if (auth) {
      const data = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.current?.value,
          email: email.current?.value,
          password: password.current?.value,
        }),
      });
      const jwtToken = await data.json();
      localStorage.setItem("token", jwtToken.token);
      navigate("/dashboard");
    } else {
      const data = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current?.value,
          password: password.current?.value,
        }),
      });
      const jwtToken = await data.json();
      localStorage.setItem("token", jwtToken.token);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center w-full bg-slate-500">
      <div className="w-4/12 my-6 bg-white border border-b-2 rounded-lg py-4">
        <form
          className="h-screen flex items-center justify-center flex-col"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className=" font-bold text-3xl">{auth ? "SignUp" : "SignIn"}</h1>
          <div className="w-full px-4 mt-20">
            {auth && (
              <>
                <h3>Name</h3>
                <input
                  ref={name}
                  className="border border-b-2 rounded-md px-2 w-full py-1"
                  placeholder="Name.."
                ></input>
              </>
            )}
            <h3 className="mt-5">Email</h3>
            <input
              ref={email}
              className="border border-b-2 rounded-md px-2 w-full py-1"
              placeholder="Email.."
            ></input>
            <h3 className="mt-5">Passowrd</h3>
            <input
              ref={password}
              className="border border-b-2 rounded-md px-2 w-full py-1"
              placeholder="Password.."
            ></input>
          </div>
          <button
            className="border border-b-2 w-1/2 py-2 my-3 text-white bg-black rounded-md"
            onClick={() => handleAuth()}
          >
            {auth ? "SignUp" : "SignIn"}
          </button>
          <p>
            {auth ? "Already have an Account?" : "Want to Register?"}{" "}
            <span className="font-bold" onClick={() => setAuth(!auth)}>
              {auth ? "SignIn" : "SignUp"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
