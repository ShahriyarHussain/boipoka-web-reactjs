import React from "react";

function ListingCard(props) {
  // const [condition, setCondition] = useState("");

  // if (props.details.condition === 1) {
  //   console.log("c chk", props.details.condition);
  //   return "Excellent";
  // } else if (props.details.condition === 2) {
  //   console.log("2");
  //   return "Fair";
  // } else if (props.details.condition === 3) {
  //   console.log("3");
  //   return "Acceptable";
  // } else if (props.details.condition === 4) {
  //   console.log("4");
  //   return "Well worn";

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
            console.log("c chk", props.details.condition);
            return "Excellent";
          } else if (props.details.condition === 2) {
            console.log("2");
            return "Fair";
          } else if (props.details.condition === 3) {
            console.log("3");
            return "Acceptable";
          } else if (props.details.condition === 4) {
            console.log("4");
            return "Well worn";
          }
        })()}
      </div>
    </div>
  );
}

export default ListingCard;
