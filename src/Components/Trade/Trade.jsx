import { React, Component } from "react";
import Listings from "./Listings";
import Loader from "../Loaders/Loaders";

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = { listings: [], status: false };
  }

  async componentDidMount() {
    try {
      const resource = await fetch("http://127.0.0.1:8000/api/listings/");
      const listing = await resource.json();
      this.setState({
        listings: listing,
        status: true,
      });
      console.log(listing);
      console.log("fetch success");
    } catch (e) {
      this.setState({
        status: false,
      });
      console.log(e);
    }
  }

  render() {
    let listingList = null;
    if (this.state.status) {
      listingList = (
        <ul>
          {this.state.listings.map((listing) => (
            <li key={listing.id}>
              <Listings
                title={listing.title}
                price={listing.price}
                type={listing.type}
                condition={listing.condition}
                views={listing.views}
                wishlists={listing.wishlists}
              />
            </li>
          ))}
        </ul>
      );
    } else {
      listingList = <Loader />;
    }

    return (
      <div className='flex-row ml-16 h-auto w-auto'>
        <h1 className='font-bold text-5xl p-2 m-5'>Book Listings</h1>
        <div className='p-2 m-5'>{listingList}</div>
      </div>
    );
  }
}

export default Community;
