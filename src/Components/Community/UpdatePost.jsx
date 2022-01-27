import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckLogin from "../../Hooks/CheckLogin";
import { UserContext } from "../../Hooks/UserContext";
import ErrorMessage from "../Loaders/ErrorMessage";
import Loader from "../Loaders/Loaders";

function UpdatePost() {
  CheckLogin();

  const url = process.env.REACT_APP_API_URL + "posts/";
  const { userId, username } = useContext(UserContext);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");
  const [postDetails, setPostDetails] = useState({
    content: "",
    post_type: "",
  });
  const { id } = useParams();

  let navigate = useNavigate();

  const onChangeHandler = (e) => {
    setPostDetails((previousData) => {
      return {
        ...previousData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    console.log("I am above here");
    const abortController = new AbortController();

    fetch(url + id + "/", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      signal: abortController.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Unable to fetch post from the resource");
        }
        return response.json();
      })
      .then((json) => {
        setIsPending(false);
        setPostDetails({
          content: json.content,
          post_type: json.post_type,
        });
        setMessage("");
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch operation ignored");
        } else if (err.name === "TypeError") {
          setIsPending(false);
          setMessage("Unable to connect to server");
        } else {
          setIsPending(false);
          console.log("The error:", err);
          setMessage("Unexpected error occured");
        }
      });
    return () => {
      abortController.abort();
    };
  }, [url, id]);

  const updatePostHandler = () => {
    const postData = {
      content: postDetails.content,
      post_type: postDetails.post_type,
      author: userId,
    };

    setIsPending(true);

    fetch(url + id + "/", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          setMessage("Unable to fetch post from the resource");
          throw Error("Unable to fetch post from the resource");
        }
        return response.json();
      })
      .then((json) => {
        console.log(json.id);
        setIsPending(false);
        navigate(`/posts/${json.id}/`);
      })
      .catch((err) => {
        if (err.name === "TypeError") {
          setIsPending(false);
          setMessage("Unable to connect to server");
        } else {
          setIsPending(false);
          setMessage("");
          console.log(err.toString());
        }
      });
  };

  return (
    <div className='ml-20 m-4'>
      <h1 className='text-6xl mx-3 mb-6 font-bold text-darkblue'>
        Update Your Post
      </h1>
      {isPending ? (
        <Loader message={"Updating"} />
      ) : (
        <ErrorMessage message={message} />
      )}
      <div className='text-red-600 font-bold'>{message}</div>
      <div className='bg-darkblue rounded-2xl h-auto max-w-2xl '>
        <div className='p-3 text-purewhite'>
          <div className='font-bold m'>
            <div className='mx-3'>
              {username}
              <select
                className='rounded-xl border-2 border-white p-1 text-darkblue bg-purewhite ml-3'
                name='post_type'
                value={postDetails.post_type}
                onChange={onChangeHandler}>
                <option
                  className='bg-purewhite text-black rounded-xl'
                  value='Is Having A Sale'>
                  Is Having A Sale
                </option>
                <option value='Is Performing A Giveaway'>
                  Is Performing A Giveaway
                </option>
                <option value='Has Shared A Book Review!'>
                  Has Shared A Book Review!
                </option>
                <option value='Is Reading A New Book!'>
                  Is Reading A New Book!
                </option>
              </select>
            </div>
          </div>
          <div className='mt-4'>
            <div>
              <div className='text-purewhite font-semibold mb-2'>
                What would you like to update ?
              </div>
              <textarea
                className='mx-2 rounded-xl p-2 bg-gray-500 text-white w-auto'
                name='content'
                value={postDetails.content}
                onChange={onChangeHandler}></textarea>
            </div>
          </div>
          <button
            className='bg-mildorange p-2 font-bold rounded-xl m-3'
            onClick={updatePostHandler}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
