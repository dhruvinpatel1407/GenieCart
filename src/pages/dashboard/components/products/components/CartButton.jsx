import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../../../setup/store/actions";
import Cookies from "js-cookie";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import PropTypes from "prop-types";

const CartButton = ({ product }) => {
  const [notification, setNotification] = useState(null);
  const Cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  // Check if the user is logged in using Cookies
  const isUserLoggedIn = Cookies.get("user");

  // Show a temporary notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
  };

  // Find the product in the cart to manage quantity
  const cartItem = Cart.find((item) => item.id === product.id);

  // Handle adding product to the cart
  const handleAddToCart = () => {
    if (!isUserLoggedIn) {
      showNotification("You must be logged in to add items to the cart.");
      return;
    }
    dispatch(addToCart(product)); // Dispatch addToCart action to Redux
  };

  // Handle incrementing the product quantity in the cart
  const handleIncrement = () => {
    if (!isUserLoggedIn) {
      showNotification("You must be logged in to modify the cart.");
      return;
    }
    dispatch(addToCart(product)); // Dispatch addToCart action to Redux (increment)
  };

  // Handle decrementing the product quantity in the cart
  const handleDecrement = () => {
    if (!isUserLoggedIn) {
      showNotification("You must be logged in to modify the cart.");
      return;
    }
    dispatch(removeFromCart(product.id)); // Dispatch removeFromCart action to Redux
  };

  return (
    <>
      {/* Notification display */}
      {notification && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow">
          {notification}
        </div>
      )}

      {/* If the product is not in the cart, show 'Add to Cart' button */}
      {!cartItem ? (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      ) : (
        /* If the product is already in the cart, show quantity controls */
        <span className="flex flex-row items-center">
          {/* Decrement quantity button */}
          <button className="text-black text-3xl" onClick={handleDecrement}>
            <CiSquareMinus data-testid="CiSquareMinus" />
          </button>

          {/* Display the current quantity of the product in the cart */}
          <span className="px-2 text-2xl">{cartItem.quantity}</span>

          {/* Increment quantity button */}
          <button className="text-black text-3xl" onClick={handleIncrement}>
            <CiSquarePlus data-testid="CiSquarePlus" />
          </button>
        </span>
      )}
    </>
  );
};

// PropTypes validation for `product` prop
CartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired, // Validate that `id` is a required string
    quantity: PropTypes.number, // Optional: Validate `quantity` if it's being passed
  }).isRequired, // `product` should be an object with required `id` and optionally `quantity`
};

export default CartButton;
