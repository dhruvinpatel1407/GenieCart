import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"; // Import js-cookie for user session handling
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../setup/store/actions"; // Import the action to remove from wishlist
import { CiCircleRemove } from "react-icons/ci";

// Lazy load the CartButton component to improve performance
const CartButton = lazy(() =>
  import("../dashboard/components/products/components/CartButton")
);

const Wishlist = () => {
  const wishlist = useSelector((state) => state.WishList); // Fetch wishlist from the Redux store
  const dispatch = useDispatch(); // Hook to dispatch actions
  // console.log(wishlist);
  // Check if the user is logged in by checking the cookie
  const isUserLoggedIn = Cookies.get("user");

  // Function to handle removing item from wishlist
  const handleRemove = (itemId) => {
    dispatch(removeFromWishlist(itemId)); // Dispatch the action to remove the item
  };

  // Conditionally render content based on login status and wishlist content
  return (
    <div className="relative w-full" data-testid="wishlist-component">
      {/* Show logged-in message or wishlist */}
      {!isUserLoggedIn ? (
        <div className="min-h-screen" data-testid="not-logged-in">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center">
            <div className="text-center text-white px-8 py-6 bg-blue-900 rounded-lg shadow-lg">
              <p className="text-xl font-semibold mb-4">
                You are not logged in.
              </p>
              <p className="mb-6">Log in to view and manage your wishlist.</p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all"
                id="login-button"
              >
                Go to Login
              </button>
            </div>
          </div>{" "}
        </div>
      ) : wishlist.length === 0 ? (
        // Show empty wishlist message if no items are found
        <div
          className="flex justify-center items-center py-20 h-full bg-gray-50"
          data-testid="empty-wishlist"
        >
          <div className="text-center p-6 bg-white rounded-lg shadow-xl w-96">
            <div
              className="text-blue-900 text-4xl font-extrabold mb-4"
              data-testid="wishlist-empty-icon"
            >
              <span role="img" aria-label="Empty wishlist">
                🛒
              </span>
            </div>
            <p className="text-lg text-gray-600 mb-6" data-testid = "Empty Message">
              Your wishlist is empty.
            </p>
            <p className="text-md text-gray-500 mb-6">
              Start adding products you love!
            </p>
            <button
              className="px-6 py-2 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
              id="go-to-shop-button"
            >
              <Link to="/dashboard">Go to Shop</Link>
            </button>
          </div>
        </div>
      ) : (
        // Display wishlist items in a table
        <Suspense fallback={<div>Loading CartButton...</div>}>
          <div className="overflow-x-auto min-h-screen">
            <table
              className="min-w-full table-auto border-collapse"
              data-testid="wishlist-table"
            >
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border-b text-left">Image</th>
                  <th className="px-4 py-2 border-b text-left">Name</th>
                  <th className="px-4 py-2 border-b text-left">Price</th>
                  <th className="px-4 py-2 border-b text-left">Stock Status</th>
                  <th className="px-4 py-2 border-b text-left">Add to Cart</th>
                  <th className="px-4 py-2 border-b text-left">Remove</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50"
                    data-testid={`wishlist-item-${item.id}`}
                  >
                    <td className="px-4 py-2 border-b">
                      <img
                        src={item.images[0] || item.thumbnailImage}
                        alt={item.name || item.title}
                        className="w-24 h-24 object-cover rounded"
                        id={`item-image-${item.id}`}
                      />
                    </td>
                    <td
                      className="px-4 py-2 border-b"
                      id={`item-name-${item.id}`}
                    >
                      {item.name || item.title}
                    </td>
                    <td
                      className="px-4 py-2 border-b"
                      id={`item-price-${item.id}`}
                    >
                      ${item.price || item.basePrice}
                    </td>
                    <td
                      className="px-4 py-2 border-b"
                      id={`item-stock-status-${item.id}`}
                    >
                      <span
                        className={
                          item.stock > 0 ? "text-green-400" : "text-red-400"
                        }
                      >
                        {item.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      {item.stock > 0 ? (
                        <CartButton product={item} />
                      ) : (
                        <button
                          className="bg-gray-400 text-white px-4 py-2 rounded"
                          disabled
                          id={`out-of-stock-button-${item.id}`}
                        >
                          Out of Stock
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleRemove(item.id)} // Call the remove function
                        className="text-red-500 hover:text-red-700 text-4xl transition-all duration-300"
                        id={`remove-button-${item.id}`}
                        data-testid={`remove-item-${item.id}`}
                      >
                        <CiCircleRemove />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Suspense>
      )}
    </div>
  );
};


export default Wishlist;
