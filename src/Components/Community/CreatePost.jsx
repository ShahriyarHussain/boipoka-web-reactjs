import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckLogin from "../../Hooks/CheckLogin";
import { UserContext } from "../../Hooks/UserContext";
import Loader from "../Loaders/Loaders";

function CreatePost() {
  const { loggedIn } = useContext(UserContext);
  CheckLogin();

  const url = process.env.REACT_APP_API_URL + "posts/";
  const { userId, username } = useContext(UserContext);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");
  const [postDetails, setPostDetails] = useState({
    content: "",
    post_type: "Is Having A Sale",
  });

  let navigate = useNavigate();

  const onChangeHandler = (e) => {
    setPostDetails((previousData) => {
      return {
        ...previousData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const createPostHandler = () => {
    const postData = {
      content: postDetails.content,
      post_type: postDetails.post_type,
      author: userId,
    };

    setIsPending(true);

    fetch(url, {
      method: "POST",
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
        }
      });
  };

  return (
    <div className='ml-20 m-4'>
      <h1 className='text-6xl mx-3 mb-6 font-bold text-darkblue'>
        Create A Post
      </h1>
      {isPending ? <Loader /> : ""}
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
                What would you like to share ?
              </div>
              <textarea
                className='mx-2 rounded-xl p-2 bg-gray-500 text-white w-auto'
                name='content'
                onChange={onChangeHandler}></textarea>
            </div>
          </div>
          <button
            className='bg-mildorange p-2 font-bold rounded-xl m-3'
            onClick={createPostHandler}>
            Make post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
