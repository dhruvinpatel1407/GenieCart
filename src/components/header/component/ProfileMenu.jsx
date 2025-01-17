import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ColorRing } from "react-loader-spinner";

// Lazy load icons to improve performance by loading them only when needed
const CgProfile = lazy(() =>
  import("react-icons/cg").then((module) => ({ default: module.CgProfile }))
);
const BiUserCircle = lazy(() =>
  import("react-icons/bi").then((module) => ({ default: module.BiUserCircle }))
);
const BiCart = lazy(() =>
  import("react-icons/bi").then((module) => ({ default: module.BiCart }))
);
const BiHeart = lazy(() =>
  import("react-icons/bi").then((module) => ({ default: module.BiHeart }))
);
const BiGift = lazy(() =>
  import("react-icons/bi").then((module) => ({ default: module.BiGift }))
);
const FiSettings = lazy(() =>
  import("react-icons/fi").then((module) => ({ default: module.FiSettings }))
);
const MdOutlineLogout = lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineLogout,
  }))
);
const FaMoneyCheckAlt = lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaMoneyCheckAlt,
  }))
);

const ProfileMenu = () => {
  // State to handle the menu toggle, user data, and login status
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Effect to handle user authentication and menu visibility
  useEffect(() => {
    const userCookie = Cookies.get("user");
    // console.log(userCookie);
    if (userCookie) {
      setUser({ name: userCookie });
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }

    // Handle clicks outside the menu to close it
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Add event listener for detecting outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout handler
  const handleLogout = () => {
    Cookies.remove("user");
    setUser(null);
    setIsUserLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  // Menu items with labels, icons, and links
  const menuItems = [
    { label: "Profile", icon: <BiUserCircle />, link: "/dashboard" },
    { label: "Cart", icon: <BiCart />, link: "/cart" },
    { label: "Wishlist", icon: <BiHeart />, link: "/wishlist" },
    { label: "Gift Cards", icon: <FaMoneyCheckAlt />, link: "#" },
    { label: "Rewards", icon: <BiGift />, link: "#" },
    { label: "Account Settings", icon: <FiSettings />, link: "#" },
  ];

  return (
    <div className="relative">
      <Suspense
        fallback={
          <div>
            <ColorRing
              visible={true}
              height="10"
              width="10"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        }
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Profile menu"
          className="rounded-full text-3xl text-white hover:text-blue-500 transition"
          data-testid="profile-button"
        >
          <CgProfile /> {/* Profile Icon */}
        </button>
      </Suspense>

      {menuOpen && (
        <div
          ref={menuRef} // Set ref to detect outside clicks
          className="absolute text-base top-12 right-0 bg-white shadow-lg rounded-lg z-10 w-72"
          role="menu"
        >
          <div className="p-5">
            {isUserLoggedIn && (
              <p className="mb-4 text-base text-gray-800 font-semibold">
                Hello,{" "}
                <span data-testid="user-name" className="text-blue-600">
                  {user.name} {/* Display user's name if logged in */}
                </span>
              </p>
            )}
            <ul data-testid="profile-menu">
              {menuItems.map((item, index) => (
                <li
                  key={index} // Provide key for list items
                  className="mb-3 flex items-center text-gray-700 hover:text-blue-500 transition"
                >
                  <Suspense
                    fallback={
                      <div className="text-gray-400">
                        <ColorRing
                          visible={true}
                          height="10"
                          width="10"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                          ]}
                        />
                      </div>
                    }
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                  </Suspense>
                  <Link to={item.link} onClick={() => setMenuOpen(false)}>
                    {item.label} {/* Menu item label */}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              {isUserLoggedIn ? (
                <Suspense
                  fallback={
                    <div className="text-gray-400">
                      <ColorRing
                        visible={true}
                        height="10"
                        width="10"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                          "#e15b64",
                          "#f47e60",
                          "#f8b26a",
                          "#abbd81",
                          "#849b87",
                        ]}
                      />
                    </div>
                  }
                >
                  <button
                    data-testid="logout-btn"
                    onClick={handleLogout} // Handle logout action
                    className="block w-full p-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
                  >
                    <MdOutlineLogout className="inline-block mr-2" />
                    Logout {/* Logout button */}
                  </button>
                </Suspense>
              ) : (
                <div className="flex items-center justify-between">
                  <button className="block me-2 p-2 w-1/2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      Login {/* Link to login page */}
                    </Link>
                  </button>
                  <button className="block p-2 w-1/2 text-center text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100 transition">
                    <Link to="/signup" onClick={() => setMenuOpen(false)}>
                      Sign Up {/* Link to signup page */}
                    </Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
