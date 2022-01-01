import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function CheckLogin() {
  const url = process.env.REACT_APP_BASE_URL;
  const { loggedIn, setloggedIn, setUserId, setUsername } =
    useContext(UserContext);

  let navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/login");
  //   }
  //   return () => {};
  // }, []);

  useEffect(() => {
    if (!loggedIn) {
      if (localStorage.getItem("token") ? true : false) {
        fetch(url + "users/current_user", {
          method: "GET",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              setloggedIn(true);
              return response.json();
            } else {
              console.log("chk");
              setloggedIn(false);
              navigate("/login");
              return response.statusText;
            }
          })
          .then((json) => {
            setUserId(json.id);
            setUsername(json.username);
            console.log("chklog", json.id, json.username);
          });
      } else {
        navigate("/login");
      }
    }
    return () => {
      console.log("user has logged in");
    };
  }, []);
}

export default CheckLogin;
