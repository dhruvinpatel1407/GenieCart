import React, { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import PropTypes from "prop-types";

// Lazy load CartButton component to improve performance
const CartButton = React.lazy(() =>
  import("../dashboard/components/products/components/CartButton")
);

// Lazy load product images for optimized performance
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  // Set image as loaded when it finishes loading
  const handleLoad = () => setLoaded(true);

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      onLoad={handleLoad}
    />
  );
};

// PropTypes validation for the props
LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const ProductPage = () => {
  const {id } = useParams();
  // console.log(id, category);

  // Retrieve all product data from Redux store
  const AllItemsData = useSelector((state) => state.AllItemsData2);
  // console.log(AllItemsData);

  // Helper function to find product by its ID
  const findProductById = (data, id) => {
    for (const category in data) {
      const subCategoryOrProducts = data[category];

      // Check for subcategories or nested products
      if (
        typeof subCategoryOrProducts === "object" &&
        !Array.isArray(subCategoryOrProducts)
      ) {
        for (const subCategory in subCategoryOrProducts) {
          const products =
            subCategoryOrProducts[subCategory]?.products ||
            subCategoryOrProducts[subCategory];
          if (Array.isArray(products)) {
            const product = products.find((item) => item.id === id);
            if (product) {
              return product;
            }
          }
        }
      } else if (Array.isArray(subCategoryOrProducts)) {
        // Handle direct product array at top level
        const product = subCategoryOrProducts.find((item) => item.id === id);
        if (product) {
          return product;
        }
      }
    }
    return null; // Return null if product is not found
  };

  const numericId = Number(id);
  const product = findProductById(AllItemsData, numericId);

  if (!product) {
    return (
      <div className="p-6 max-w-5xl mx-auto bg-gray-50">
        <h2 className="text-2xl font-bold text-red-600" data-testid="Not Found">
          Product Not Found
        </h2>
        <p className="text-gray-700" data-testid="Message">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2 p-4 bg-white rounded shadow-lg">
          <Suspense
            fallback={
              <div>
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  data-testid="Spinner"
                />
              </div>
            }
          >
            <LazyImage
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-auto rounded-md shadow-md"
            />
          </Suspense>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-blue-900" data-testid="title">
            {product.title}
          </h1>
          <p className="text-lg text-gray-600" data-testid="decription">
            {product.description}
          </p>
          <div
            className="text-2xl font-semibold text-green-600"
            data-testid="price"
          >
            ${product.price}
          </div>
          <p
            data-testid="stock"
            className={`font-medium ${
              product.availabilityStatus === "In Stock"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {product.availabilityStatus}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500">★ {product.rating}</span>
            <span className="text-gray-500">
              (Based on {product.reviews.length} reviews)
            </span>
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4 mt-4" data-testis="cart-button">
            <Suspense fallback={<div>Loading CartButton...</div>}>
              <CartButton product={product} />
            </Suspense>
            <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Additional Details */}
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-bold text-blue-900">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-800">Dimensions</h3>
            <p className="text-gray-700">
              {product.dimensions.width} x {product.dimensions.height} x{" "}
              {product.dimensions.depth} (WxHxD)
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800">Weight</h3>
            <p className="text-gray-700">{product.weight} kg</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800">
              Minimum Order Quantity
            </h3>
            <p className="text-gray-700">{product.minimumOrderQuantity}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800">Warranty</h3>
            <p className="text-gray-700">{product.warrantyInformation}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-blue-900">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Shipping Information */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-900">
          Shipping Information
        </h2>
        <p className="text-gray-700">{product.shippingInformation}</p>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-900">Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="flex flex-row flex-wrap justify-between">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 m-4 bg-white border border-gray-300 rounded shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-900">
                    {review.reviewerName}
                  </span>
                  <span className="text-yellow-500">★ {review.rating}</span>
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
                <div className="text-sm text-gray-500">
                  <p>Email: {review.reviewerEmail}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No reviews available for this product.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
