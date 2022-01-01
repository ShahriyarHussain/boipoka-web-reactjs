import Axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../Assets/boipoka_logo.svg";

function Register() {
  const url = process.env.REACT_APP_BASE_URL;

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [pass, setpass] = useState("");
  const [message, setmessage] = useState("Development preview");

  let navigate = useNavigate();

  function setData(e) {
    setUserData((previousData) => {
      return {
        ...previousData,
        [e.target.name]: e.target.value,
      };
    });
  }

  const validate = (value) => {
    if (3 < value.length && value.length < 20) {
      return true;
    } else {
      return false;
    }
  };

  function isValid() {
    return (
      validate(userData.firstName) &&
      validate(userData.lastName) &&
      validate(userData.username)
    );
  }

  const registerHandler = (e) => {
    e.preventDefault();
    if (!isValid()) {
      setmessage("Please fill up the fields correctly");
      return false;
    }

    const { firstName, lastName, username, password } = userData;
    Axios.post(url + "users/users/create", {
      user: {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
      },
    }).then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        setmessage("Error! Code: " + response.status);
      }
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
        <h2 className='font-extrabold text-center text-3xl p-2 mt-2 mb-4'>
          Create A Boipoka Account
        </h2>
      </div>

      <div className='flex flex-col items-center'>
        <form
          className='flex flex-col justify-center p-2 m-2 max-w-md h-auto w-auto'
          onSubmit={registerHandler}>
          <label>First Name</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8'
            required
            type='text'
            name='firstName'
            value={userData.firstName}
            onChange={setData}
          />
          <p className='text-red-600 mt-2 mb-3 text-xs'>
            {validate(userData.firstName)
              ? ""
              : "Must be within 3-20 characters"}
          </p>

          <label className='m-2'>Last Name</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 text-lg '
            required
            type='text'
            name='lastName'
            value={userData.lastName}
            onChange={setData}
          />
          <p className='text-red-600 mt-2 mb-3 text-xs'>
            {validate(userData.lastName)
              ? ""
              : "Must be within 3-20 characters"}
          </p>

          <label className='m-2'>Username</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 text-lg'
            required
            type='text'
            name='username'
            value={userData.username}
            onChange={setData}
          />
          <p className='text-red-600 mt-2 mb-3 text-xs'>
            {validate(userData.username)
              ? ""
              : "Must be within 3-20 characters"}
          </p>

          <label className='m-2'>Password</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 text-lg'
            required
            type='password'
            name='password'
            value={userData.password}
            onChange={setData}
          />

          <label className='m-2'>Confirm Password</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 text-lg'
            required
            type='password'
            name='pass'
            value={pass}
            onChange={(e) => setpass(e.target.value)}
          />
          <p className='text-red-600 mt-2 mb-3 text-xs'>
            {userData.password === pass ? "" : "Passwords Don't match"}
          </p>

          <button className='bg-mildorange text-darkblue font-bold rounded-3xl p-2 mt-4 max-h-10 max-w-md'>
            Register
          </button>
        </form>

        <div className='mt-3 p-3 font-bold text-md'>
          <p className='text-darkblue'>
            Already have an account?
            <Link to='/login'>
              <span className='text-yellow-500 ml-2'> Log in</span>
            </Link>
          </p>
        </div>

        <p className='text-red-600 mt-3 font-bold text-xl'>{message}</p>
      </div>
    </div>
  );
}

export default Register;
