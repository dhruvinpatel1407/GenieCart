import { useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetMensItemsData } from "../../../../setup/store/actions";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Lazy loading WishlistButton and CartButton
const WishlistButton = lazy(() =>
  import("../products/components/WishlistButton")
);
const CartButton = lazy(() => import("../products/components/CartButton"));

const TopPicksSection = () => {
  const items = useSelector((state) => state.MensItemsData);
  const Data = items.shirts?.products?.slice(0, 5); // Ensure safe access to products
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetMensItemsData());
  }, [dispatch]);

  // Responsive settings for react-multi-carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 20,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 15,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 5,
    },
  };

  return (
    <div className="p-8 bg-gray-100 mt-8">
      {/* Section Header */}
      <h2 className="text-3xl md:text-4xl pb-8 font-extrabold text-center my-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        Top Picks for You
      </h2>

      {/* Carousel with Product Cards */}
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        showDots={false}
        containerClass="carousel-container"
        itemClass="px-4" // Add spacing between items
      >
        {Data?.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between"
          >
            <Link to={`/product/${product.category}/${product.id}`}>
              <img
                src={product.images[1] || product.images}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 transform hover:scale-110"
              />
              <div className="text-center flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  <span className="block text-ellipsis text-center overflow-hidden whitespace-nowrap max-w-[150px]">
                    {product.name || product.title}
                  </span>
                </h3>
                <p className="text-yellow-200 font-medium mb-2">
                  ${product.price}
                </p>
                <div className="flex justify-center mb-4">
                  <span className="text-yellow-500 text-lg">
                    {"★".repeat(product.rating)}
                    {"☆".repeat(5 - product.rating)}
                  </span>
                </div>
              </div>
            </Link>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-2">
              <Suspense fallback={<div>Loading...</div>}>
                <WishlistButton product={product} />
                <CartButton product={product} />
              </Suspense>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopPicksSection;
