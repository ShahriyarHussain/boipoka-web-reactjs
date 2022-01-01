import CheckLogin from "../../Hooks/CheckLogin";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import ListingCard from "./ListingCard";

const Listings = () => {
  CheckLogin();

  // let navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL + "listings/";
  const [listings, setListings] = useState(null);

  useEffect(() => {
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
        return response.json();
      })
      .then((json) => {
        setListings(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(listings);

  return (
    <div className='p-2 ml-20'>
      <h1 className='font-bold text-4xl p-2'>Listings</h1>

      <Link to='/add_listing'>
        <button className='bg-mildorange rounded-lg p-2 text-darkblue mt-3'>
          Add Listing
        </button>
      </Link>

      <div className='flex flex-row justify-start content-start'>
        {listings &&
          listings.map((listing) => <ListingCard details={listing} />)}
      </div>
    </div>
  );
};

export default Listings;
