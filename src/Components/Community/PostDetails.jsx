import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import useFetch from "../../Hooks/useFetch";
import Loader from "../Loaders/Loaders";
import { BsFillHeartFill } from "react-icons/bs";
import CheckLogin from "../../Hooks/CheckLogin";
import { UserContext } from "../../Hooks/UserContext";
import { Link } from "react-router-dom";

const PostDetails = () => {
  CheckLogin();

  const url = process.env.REACT_APP_API_URL + "posts/";

  const { id } = useParams();
  const { username } = useContext(UserContext);
  const [postDetails, setPostDetails] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // console.log("update", id);

  useEffect(() => {
    setIsPending(true);
    console.log("I am above here");
    const abortController = new AbortController();

    fetch(
      url + id + "/",
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      },
      { signal: abortController.signal }
    )
      .then((response) => {
        console.log(response);
        console.log("success1");
        if (!response.ok) {
          throw Error("Unable to fetch post from the resource");
        }
        return response.json();
      })
      .then((json) => {
        console.log("success2");
        setIsPending(false);
        setPostDetails(json);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch operation ignored");
        } else if (err.name === "TypeError") {
          setIsPending(false);
          setError("Unable to connect to server");
        } else {
          // setError(err.message);
          setIsPending(false);
          console.log("The error:", err);
          setError("Unexpected error occured");
        }
      });
    return () => {
      abortController.abort();
    };
  }, [url]);

  return (
    <div className='h-auto w-auto ml-20'>
      {isPending && <Loader />}
      <div className='text-red-600 font-bold text-3xl'> {error} </div>
      <div>
        {postDetails.author === username ? (
          <div className='flex flex-row'>
            <Link className='m-4' to={`/posts/update/${id}/`}>
              <button className='bg-mildorange rounded-lg p-2 font-bold'>
                Update Post
              </button>
            </Link>
            <Link className='m-4' to={`/posts/delete/${id}/`}>
              <button className='bg-red-700 text-purewhite rounded-lg p-2 font-bold'>
                Delete Post
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      {postDetails && (
        <article className='bg-darkblue rounded-xl max-w-5xl h-auto text-white'>
          <div className='p-2 m-5'>
            <div className='my-3'>
              <span className='font-bold mr-2'>{postDetails.author}</span>
              <span className='ml-1'>{postDetails.type}</span>
            </div>
            <div>
              <span className='text-gray-300 mt-1'>
                on {postDetails.date_posted.split("T")[0]} at{" "}
                {postDetails.date_posted.split("T")[1].split(".")[0]}
              </span>
            </div>
            <div className='bg-gray-500 rounded-xl mt-4'>
              <article className='font-medium p-4'>
                {postDetails.content}
              </article>
            </div>
            <div className='mt-5 ml-3'>
              <span>
                <BsFillHeartFill />
              </span>
              <span className='mt-3 p-1'>{postDetails.likes}</span>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default PostDetails;
