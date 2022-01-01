import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

const Postcard = ({ id, author, type, date, content, likes, comments }) => {
  return (
    <div className='bg-darkblue rounded-xl text-white max-w-6xl h-auto'>
      <div className='p-2 m-5'>
        <div className='mt-5 mb-1'>
          <span className='font-bold mr-2'>{author}</span>
          <span>{type}</span>
        </div>
        <div>
          <span className='text-gray-400 text-sm'>
            {" "}
            on {date.split("T")[0]} at {date.split("T")[1].split(".")[0]}
          </span>
        </div>
        <hr width='full' />
        <Link to={`/posts/${id}`}>
          <div className='bg-gray-500 rounded-xl mt-4'>
            <article className='font-medium p-4'>{content}</article>
          </div>
        </Link>
        <div className='flex flex-row mt-5 ml-5'>
          <button onClick={() => {}}>
            <div className=''>
              <span className='pt-3'>
                <BsFillHeartFill />
              </span>
              <span>{likes}</span>
            </div>
          </button>
          <div className='ml-5'>
            <span className='pt-3'>
              <FaRegComment />
            </span>
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postcard;
