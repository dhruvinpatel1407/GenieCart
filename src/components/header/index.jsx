import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProfileMenu from "./component/ProfileMenu";
import SearchButton from "./component/SearchMenu";
import CategoryMenu from "./component/CategoryMenu";

// Lazy load icons
const FaShoppingCart = lazy(() =>
  import("react-icons/fa").then((mod) => ({ default: mod.FaShoppingCart }))
);
const FaHeart = lazy(() =>
  import("react-icons/fa").then((mod) => ({ default: mod.FaHeart }))
);

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  // Get cart items from the Redux store
  const cartItems = useSelector((state) => state.cart);
  // console.log(cartItems);
  // Calculate the total number of items in the cart
  const totalCartItems = (cartItems || []).reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearchResults = (filteredProducts) => {
    // console.log("Filtered Products:", filteredProducts);
  };

  const toggleMenu = (menuName) => {
    setActiveMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  return (
    <>
      <div
        className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white"
        data-testid="navbar"
      >
        {/* Main Navbar Section */}
        <div className="flex justify-between mx-8 items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity"
            aria-label="Homepage"
            data-testid="logo-link"
          >
            <img
              src="/assets/images/Capture 1.PNG"
              alt="logo"
              className="w-40"
              data-testid="logo"
            />
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center z-30 space-x-6 text-2xl">
            <SearchButton
              isOpen={activeMenu === "search"}
              toggle={() => toggleMenu("search")}
              onSearch={handleSearchResults}
              dataTestId="search-button"
            />
            <ProfileMenu
              isOpen={activeMenu === "profile"}
              toggle={() => toggleMenu("profile")}
              dataTestId="profile-button"
            />
            <Suspense fallback={<div>Loading...</div>}>
              <Link
                to="/wishlist"
                className="hidden lg:block text-gray-300 hover:text-red-500 transition-colors"
                aria-label="Wishlist"
                data-testid="wishlist-link"
              >
                <FaHeart />
              </Link>
              <Link
                to="/cart"
                className="hidden lg:block text-gray-300 hover:text-green-500 transition-colors"
                aria-label="Cart"
                data-testid="cart-link"
              >
                <FaShoppingCart />
                {/* Badge for Cart Item Count */}
                {totalCartItems > 0 && (
                  <span
                    className="absolute top-3 right-3 bg-red-500 font-semibold text-white text-xs px-2 py-1 rounded-full"
                    data-testid="cart-badge"
                  >
                    {totalCartItems}
                  </span>
                )}
              </Link>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Category Menu */}
      <div className="sticky top-0 w-full z-10" data-testid="category-menu">
        <CategoryMenu
          isOpen={activeMenu === "category"}
          toggle={() => toggleMenu("category")}
        />
      </div>
    </>
  );
};

export default Navbar;
