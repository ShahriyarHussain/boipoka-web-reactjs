// import React, { useContext, useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import Postcard from "./Postcard";
import Loader from "../Loaders/Loaders";
// import { UserContext } from "../../Hooks/UserContext";
import CheckLogin from "../../Hooks/CheckLogin";
import { Link, useNavigate } from "react-router-dom";

const Community = () => {
  CheckLogin();

  const url = process.env.REACT_APP_API_URL + "posts/";
  const [isPending, setIsPending] = useState(false);
  const [posts, setPosts] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  // const { userId } = useContext(UserContext);

  useEffect(() => {
    setIsPending(true);
    const abortController = new AbortController();
    fetch(
      url,
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      },
      { signal: abortController.signal }
    )
      .then((response) => {
        if (!response.ok) {
          setError("Unable to fetch post from the resource");
          navigate("/login");
          throw Error("Unable to fetch post from the resource");
        }
        return response.json();
      })
      .then((json) => {
        setIsPending(false);
        setPosts(json);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else if (err.name === "TypeError") {
          setIsPending(false);
          setError("Unable to connect to server");
          navigate("/login");
        } else {
          setIsPending(false);
          setError(err.toString());
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className='ml-20 mt-4 h-auto w-auto'>
      <div className='mt-5 ml-1'>
        <h1 className='font-bold text-4xl p-2 '>Booklover's Community</h1>
        {isPending ? <Loader /> : ""}
        {error && (
          <div className='text-red-600 font-bold text-3xl ml-3'> {error} </div>
        )}
        {!isPending ? (
          <Link to='/create_post'>
            <button className='bg-mildorange text-darkblue font-semibold rounded-md hover:bg-yellow-400 transition-all p-2 ml-3 mt-3'>
              Create a post
            </button>
          </Link>
        ) : (
          ""
        )}
        <div>
          {posts && (
            <div>
              {posts.map((post) => (
                <div className='max-w-2xl ml-6 h-auto my-3' key={post.id}>
                  <Postcard
                    id={post.id}
                    author={post.author}
                    type={post.post_type}
                    date={post.date_posted}
                    content={post.content}
                    likes={post.likes}
                    comments={post.commentCount}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
