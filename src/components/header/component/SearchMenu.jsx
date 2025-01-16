import {
  useState,
  useEffect,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllData } from "../../../setup/store/actions";
import PropTypes from "prop-types";

// Lazy load icons
const FaSearch = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaSearch }))
);
const IoIosCloseCircleOutline = lazy(() =>
  import("react-icons/io").then((module) => ({
    default: module.IoIosCloseCircleOutline,
  }))
);

const SearchButton = ({ onSearch }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const debounceTimeout = useRef(null);
  const searchContainerRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  // Fetch categories from Redux store
  const categories = useSelector((state) => state.AllItemsData2);

  // Flatten nested products from categories
  const flattenProducts = (data) => {
    const flatList = [];
    const traverse = (obj) => {
      if (obj) {
        Object.values(obj).forEach((value) => {
          if (Array.isArray(value)) {
            flatList.push(...value);
          } else if (typeof value === "object" && value !== null) {
            traverse(value);
          }
        });
      }
    };
    traverse(data);
    return flatList;
  };

  const allProducts = flattenProducts(categories);

  const debounceSearch = useCallback(
    (term) => {
      const filtered = allProducts.filter(
        (product) =>
          product.title &&
          product.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
      onSearch(filtered); // Call onSearch with filtered products
    },
    [allProducts, onSearch]
  );

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Clear previous debounce timeout and set a new one
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      debounceSearch(term);
    }, 300);
  };

  const toggleSearch = () => {
    if (isSearching) {
      setSearchTerm("");
      setFilteredProducts([]);
      onSearch([]); // Reset search results when closing search
    }
    setIsSearching(!isSearching);
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setIsSearching(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={searchContainerRef}>
      <Suspense fallback={<div className="text-white text-sm">Loading...</div>}>
        <button
          onClick={toggleSearch}
          className="text-white hover:bg-blue-600"
          aria-label="Toggle search input"
          aria-expanded={isSearching}
          data-testid="search-button"
        >
          <FaSearch />
        </button>
      </Suspense>

      {isSearching && (
        <div className="absolute flex text-sm flex-row justify-between items-center sm:top-[-6px] sm:right-[30px] top-10 right-[-50px] text-black bg-white shadow-md p-2 rounded-full w-72">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleInputChange}
            className="border border-gray-300 px-2 py-1 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search products"
            data-testid="search-menu"
          />
          <Suspense fallback={<div>...</div>}>
            <button
              onClick={toggleSearch}
              className="mx-4 text-2xl"
              aria-label="Close search input"
            >
              <IoIosCloseCircleOutline />
            </button>
          </Suspense>
        </div>
      )}

      {isSearching && filteredProducts.length > 0 && (
        <div
          className="absolute text-sm ps-4 sm:top-16 sm:right-[30px] top-28 right-[-50px] z-10 bg-white shadow-md w-72 max-h-60 overflow-y-auto"
          aria-live="assertive"
        >
          <ul className="space-y-2" data-testid="search-menu">
            {filteredProducts.map((product, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200 text-black"
                onClick={() => {
                  setSearchTerm(product.title);
                  setIsSearching(false);
                }}
              >
                <Link to={`/product/${product.category}/${product.id}`}>
                  {product.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display 'No products found' if no matching products */}
      {searchTerm && filteredProducts.length === 0 && (
        <div className="absolute text-sm text-center sm:top-16 sm:right-[30px] top-28 right-[-100px] z-10 bg-white shadow-md w-96 max-h-60 overflow-y-auto">
          <p className="p-4 text-black">No products found</p>
        </div>
      )}
    </div>
  );
};

// PropTypes validation for the `onSearch` prop
SearchButton.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchButton;
