import { useState } from "react";
import ReactPaginate from "react-paginate";
import WishlistButton from "./WishlistButton";
import CartButton from "./CartButton";
import { Link } from "react-router-dom";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";
import PropTypes from "prop-types";

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15; // Number of products per page
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Handle page change for pagination
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Slice the products based on current page
  const startOffset = currentPage * itemsPerPage;
  const currentItems = products.slice(startOffset, startOffset + itemsPerPage);

  return (
    <div>
      {/* Product List */}
      <ul className="flex flex-wrap grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 grid-cols-1  gap-8 p-4">
        {currentItems.map((product) => (
          <li
            key={product.id}
            className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Link to={`/product/${product.category}/${product.id}`}>
              {/* Lazy-loaded Image */}
              <img
                src={product.images[1] || product.images} // Default image fallback
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 transform hover:scale-110"
                loading="lazy" // Lazy loading for images
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {/* Product Name with Ellipsis for overflow */}
                  <span className="block text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px] mx-auto text-center">
                    {product.name || product.title}
                  </span>
                </h3>
                <p className="text-indigo-700 font-medium mb-2">
                  ${product.price}
                </p>
                <div className="flex justify-center mb-4">
                  {/* Review Stars */}
                  <span className="text-yellow-500 text-lg">
                    {"★".repeat(product.rating + 1)}
                    {"☆".repeat(5 - product.rating)}
                  </span>
                </div>
              </div>
            </Link>

            {/* Action Buttons */}
            <div
              className="flex justify-center space-x-4 mt-2"
              data-testid="wishlist-cart-btn"
            >
              <WishlistButton
                product={product}
                className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all"
              />
              <CartButton
                product={product}
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={
          <span className="flex items-center gap-2" data-testid="previous-btn">
            <GrChapterPrevious />
          </span>
        }
        nextLabel={
          <span className="flex items-center gap-2 " data-testid="next-btn">
            <GrChapterNext />
          </span>
        }
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center items-center gap-4 mt-8 mb-8"
        pageClassName="px-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-700 transition hover:bg-blue-100 hover:text-blue-600 shadow-sm"
        activeClassName="bg-blue-600 text-blue-400 border-blue-600 shadow-md"
        previousClassName="px-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-700 transition hover:bg-blue-100 hover:text-blue-600 shadow-sm"
        nextClassName="px-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-700 transition hover:bg-blue-100 hover:text-blue-600 shadow-sm"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

// PropTypes validation
ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      images: PropTypes.array.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired, // products is a required prop
};

export default ProductList;
