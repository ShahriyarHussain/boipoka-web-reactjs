import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckLogin from "../../Hooks/CheckLogin";
import Loader from "../Loaders/Loaders";

function DeletePost() {
  const url = process.env.REACT_APP_API_URL + "posts/";

  CheckLogin();

  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  let navigate = useNavigate();

  const postDeleteHandler = () => {
    setIsPending(true);

    fetch(url + id + "/", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          navigate("/community");
        }
        throw Error("Unable to fetch post from the resource");
      })
      .catch((err) => {
        if (err.name === "TypeError") {
          setIsPending(false);
        } else {
          setIsPending(false);
          console.log(err.toString());
        }
      });
  };

  return (
    <div className='ml-20 m-4 text-darkblue'>
      <h1 className='text-6xl mx-3 mb-6 font-bold '>Delete Post</h1>
      <h2 className='text-4xl mx-3 font-semibold my-4'>
        Are you sure you would like to delete the post ?
      </h2>
      {isPending ? (
        <Loader />
      ) : (
        <div className='flex flex-row my-5'>
          <button
            className='bg-red-600 rounded-md text-purewhite font-semibold px-4 py-2 m-2'
            onClick={postDeleteHandler}>
            Yes
          </button>
          <button
            className='bg-darkblue rounded-md text-white font-semibold px-4 py-2 m-2'
            onClick={() => {
              navigate(-1);
            }}>
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default DeletePost;
