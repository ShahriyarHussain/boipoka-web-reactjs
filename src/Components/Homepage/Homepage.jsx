// import { useContext } from "react";
import CheckLogin from "../../Hooks/CheckLogin";
// import { UserContext } from "../../Hooks/UserContext";

const Homepage = () => {
  CheckLogin();
  // const { loggedIn, username, userId } = useContext(UserContext);

  return (
    <div className='flex-row ml-16 h-auto w-auto'>
      <h1 className='font-bold text-5xl p-2 mt-5 ml-1'>Homepage</h1>
      <div className='p-2 m-5'>Homepage Contents</div>
    </div>
  );
};

export default Homepage;
