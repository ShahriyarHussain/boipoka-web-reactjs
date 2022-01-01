import React from "react";

function ListingCard(props) {
  return (
    <div className='rounded-xl drop-shadow-md bg-darkblue text-white p-3 m-3 max-w-lg'>
      <div>{props.details.book_name}</div>
      <div>Description {props.details.description}</div>
      <div>wishlists {props.details.wishlisted_by}</div>
      <div>Viewed by {props.details.viewed_by}</div>
      <div>Listed by {props.details.listed_by_names}</div>
      <div className='text-mildorange'>
        {(() => {
          if (props.details.condition === 1) {
            return "Excellent";
          } else if (props.details.condition === 2) {
            return "Fair";
          } else if (props.details.condition === 3) {
            return "Acceptable";
          } else if (props.details.condition === 4) {
            return "Well worn";
          }
        })()}
      </div>
    </div>
  );
}

export default ListingCard;
