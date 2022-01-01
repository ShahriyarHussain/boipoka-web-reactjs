import React, { useContext } from "react";
import CheckLogin from "../../Hooks/CheckLogin";
import { UserContext } from "../../Hooks/UserContext";

function Account() {
  CheckLogin();
  const { username } = useContext(UserContext);

  return (
    <div className='flex-row ml-16 h-auto w-auto'>
      <h1 className='font-bold text-5xl p-2 m-5'>Account</h1>
      <div className='p-2 m-5'>Hello! {username}</div>
    </div>
  );
}

export default Account;
