import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/boipoka_logo.svg";
// import CheckLogin from "../../Hooks/CheckLogin";
import { UserContext } from "../../Hooks/UserContext";
function Login() {
  const url = process.env.REACT_APP_BASE_URL;

  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Development Preview");
  const { setloggedIn, setUserId, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    setMessage("Logging in");
    const loginData = { username: loginUsername, password };
    console.log(loginData);
    fetch(url + "token-auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return response.statusText;
        }
      })
      .then((json) => {
        if (json === "Bad Request") {
          setMessage("Invalid Credentials");
          return "";
        } else {
          localStorage.setItem("token", json.token);
          console.log(json);
          setloggedIn(true);
          setUserId(json.user.id);
          setUsername(json.user.username);
          setMessage("Login Success");
          navigate("/");
        }
      })
      .catch((error) => {
        if (error === "NetworkError") console.log(error);
        setMessage("Network Error Occured, check internet connection");
      });
  };

  return (
    <div>
      <div className='flex flex-col items-center'>
        <img
          className='rounded-full p-2 mt-2 bg-darkblue'
          src={logo}
          height='100px'
          width='100px'
          alt='Boipoka Logo'
        />
        <h2 className='font-extrabold text-3xl p-2 m-4'>Login To Boipoka</h2>
      </div>

      <div className='flex flex-col items-center'>
        <form
          className='flex flex-col justify-center p-2 m-2 max-w-md h-auto'
          onSubmit={loginHandler}>
          <label className='m-2'>Username</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8'
            type='text'
            required
            value={loginUsername}
            onChange={(e) => {
              setLoginUsername(e.target.value);
            }}
          />

          <label className='m-2'>Password</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8'
            type='password'
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className='bg-mildorange text-darkblue font-bold rounded-3xl p-2 mt-4 max-h-10 max-w-md'>
            Log In
          </button>
        </form>

        <div className='m-5 p-3 font-bold text-md'>
          <p className='text-darkblue'>
            Don't have an acount ?
            <Link to='/register'>
              <span className='text-yellow-500 ml-2'> Register</span>
            </Link>
          </p>
        </div>

        <p className='text-red-600 m-2 font-bold text-xl'>{message}</p>
      </div>
    </div>
  );
}

export default Login;
