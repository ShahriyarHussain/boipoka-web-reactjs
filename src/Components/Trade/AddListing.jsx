import React, { useContext, useEffect, useState } from "react";
import CheckLogin from "../../Hooks/CheckLogin";
import { UserContext } from "../../Hooks/UserContext";

function AddListing() {
  CheckLogin();
  // const google_books_api_url =
  // "https://www.googleapis.com/books/v1/volumes?q=isbn:";
  const url = process.env.REACT_APP_API_URL;

  const { userId } = useContext(UserContext);

  const [bookDetails, setBookDetails] = useState({
    isbn: "",
    title: "",
    genres: "Mystery",
    edition: 1,
    image: "",
    author: 0,
    description: "",
  });
  const [listingDetails, setListingDetails] = useState({
    description: "",
    price: "",
    condition: 1,
    negotiable: false,
    listing_type: true,
    listed_by: userId,
    book: 0,
  });
  const [books, setBooks] = useState(null);
  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(
      url + "books/",
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      },
      { signal: abortController.signal }
    )
      .then((response) => {
        console.log("response books", response);
        return response.json();
      })
      .then((json) => {
        console.log("books!", json);
        console.log(json[0].title);
        setBooks(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(
      url + "authors/",
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      },
      { signal: abortController.signal }
    )
      .then((response) => {
        console.log("response authors", response);
        return response.json();
      })
      .then((json) => {
        console.log("authors!", json);
        console.log(json[0].name);
        setAuthors(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  const bookDetailsHandler = (e) => {
    setBookDetails((previousData) => {
      return {
        ...previousData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const listingDetailsHandler = (e) => {
    setListingDetails((previousData) => {
      return {
        ...previousData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className='p-2 ml-20'>
      <h1 className='font-bold text-4xl p-2 '>Add a listing</h1>
      <div>
        <form className='flex flex-col items-start p-2 m-2 h-auto max-w-3xl'>
          <label>ISBN</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 m-3 text-lg'
            required
            type='text'
            name='isbn'
            onChange={bookDetailsHandler}
          />
          {/* <button
            onClick={fetchBookData}
            className='bg-mildorange text-darkblue font-bold rounded-3xl p-2 mt-4 max-h-10 max-w-md'>
            Search Book Details
          </button> */}
          {/* <p className='text-red-600 mt-2 mb-3 text-xs'>checker message</p> */}
          <label className='m-2'>Book Title</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 m-3 text-lg '
            required
            type='text'
            name='title'
            value={bookDetails.title}
            onChange={bookDetailsHandler}
          />
          {/* <p className='text-red-600 mt-2 mb-3 text-xs'>checker message</p> */}
          <label className='m-2'>Pages</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 m-3 text-lg'
            required
            type='text'
            name='pages'
            value={bookDetails.pages}
            onChange={bookDetailsHandler}
          />
          {/* <p className='text-red-600 mt-2 mb-3 text-xs'>checker message</p> */}
          <label className='m-2'>Edition</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 m-3 text-lg'
            required
            type='number'
            name='edition'
            value={bookDetails.edition}
            onChange={bookDetailsHandler}
          />
          <label className='m-2'>Author</label>
          <select
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 m-3 text-lg'
            required
            type='text'
            name='author'
            value={bookDetails.author}
            onChange={bookDetailsHandler}>
            {authors
              ? authors.map((author) => (
                  <option value={author.id}>{author.name}</option>
                ))
              : "Network Error"}
          </select>
          <label className='m-2'>Description (Book Description)</label>
          <textarea
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 m-3 text-lg'
            required
            type='text'
            name='description'
            value={bookDetails.description}
            onChange={bookDetailsHandler}
          />{" "}
          {/* <p className='text-red-600 mt-2 mb-3 text-xs'>checker message</p> */}
          <div className='mx-3'>
            Genre
            <select
              className='rounded-xl border-2 border-gray-600 e p-1 text-darkblue bg-purewhite ml-3'
              value={bookDetails.genres}
              name='genres'
              onChange={bookDetailsHandler}>
              <option
                className='bg-purewhite text-black rounded-xl'
                value='Sci-Fi'>
                Sci-Fi
              </option>
              <option value='Mystery'>Mystery</option>
              <option value='Thriller'>Thriller</option>
              <option value='Romance'>Romance</option>
            </select>
          </div>
          <button className='bg-mildorange text-darkblue font-bold rounded-3xl p-2 mt-4 max-h-10 max-w-md'>
            Add Book
          </button>
        </form>
      </div>
      <div>
        <form className='flex flex-col items-start p-2 m-2 h-auto max-w-3xl'>
          <label>Description(Listing Description)</label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 m-3 text-lg'
            required
            type='text'
            name='description'
            value={listingDetails.description}
            onChange={listingDetailsHandler}
          />
          {/* <p className='text-red-600 mt-2 mb-3 text-xs'>checker message</p> */}
          <label className='m-2'> Price </label>
          <input
            className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 m-3 text-lg '
            required
            type='number'
            name='price'
            value={listingDetails.description}
            onChange={listingDetailsHandler}
          />
          <div className='mx-3 my-2'>
            <label>Condition</label>
            <select
              className='rounded-xl border-2 border-gray-600 e p-1 text-darkblue bg-purewhite ml-3'
              value={listingDetails.condition}
              name='condition'
              onChange={listingDetailsHandler}>
              <option value={1}>Excellent</option>
              <option value={2}>Fair</option>
              <option value={3}>Acceptable</option>
              <option value={4}>Well Worn</option>
              <option value={5}>Poor</option>
            </select>
          </div>
          {/* <p className='text-red-600 mt-2 mb-3 text-xs'>checker message</p> */}
          <div className='mx-3 my-2'>
            <label>Negotiable ?</label>
            <select
              className='rounded-xl border-2 border-gray-600 e p-1 text-darkblue bg-purewhite ml-3'
              value={listingDetails.negotiable}
              name='negotiable'
              onChange={listingDetailsHandler}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className='mx-3 my-2'>
            <label>Listing Type ?</label>
            <select
              className='rounded-xl border-2 border-gray-600 e p-1 text-darkblue bg-purewhite ml-3'
              value={listingDetails.listing_type}
              name='listing_type'
              onChange={listingDetailsHandler}>
              <option value={true}>Sell</option>
              <option value={false}>Exchange</option>
            </select>
          </div>
          <div className='mx-3 my-2'>
            <label>Book ?</label>
            <select
              className='rounded-md border-2 border-gray-200 drop-shadow-sm h-8 m-3 text-lg'
              value={listingDetails.listing_type}
              name='listing_type'
              onChange={listingDetailsHandler}>
              {books
                ? books.map((book) => (
                    <option value={book.id}>{book.title}</option>
                  ))
                : "Network Error"}
            </select>
          </div>
          {/* <p className='text-red-600 mt-2 mb-3 text-xs'>checker message</p> */}
          <button className='bg-mildorange text-darkblue font-bold rounded-3xl p-2 mt-4 max-h-10 max-w-md'>
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
