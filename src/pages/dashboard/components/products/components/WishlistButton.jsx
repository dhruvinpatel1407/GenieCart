import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../../../setup/store/actions";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const WishlistButton = ({ product }) => {
  const wishlist = useSelector((state) => state.WishList || []); // Assuming 'wishlist' is the slice in the Redux store
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(null);

  // Check if the user is logged in
  const isUserLoggedIn = Cookies.get("user");

  // Check if the product is in the wishlist
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  // Show a temporary notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
  };

  const handleButtonClick = () => {
    if (!isUserLoggedIn) {
      showNotification("You must be logged in to manage your wishlist.");
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id)); // Dispatch remove action
    } else {
      dispatch(addToWishlist(product)); // Dispatch add action
    }
  };

  return (
    <>
      {/* Notification display */}
      {notification && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow">
          {notification}
        </div>
      )}

      <button className="border px-4 py-2 rounded" onClick={handleButtonClick}>
        {isInWishlist ? (
          <FaHeart className="text-red-500" data-testid="FaHeart" />
        ) : (
          <FaRegHeart className="text-black" data-testid="FaRegHeart" />
        )}
      </button>
    </>
  );
};

WishlistButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired, 
  }).isRequired, 
};

export default WishlistButton;
