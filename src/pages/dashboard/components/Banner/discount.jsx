
const DiscountCard = () => {
  return (
    <>
      <div className="relative md:mt-4 bg-blue-800 text-white py-6 px-4 md:px-8 shadow-md">
        {/* Decoration - Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-green-400 opacity-30 blur-lg"></div>

        {/* Content Wrapper */}
        <div className="relative max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          {/* Left Content */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-4xl font-extrabold tracking-wide">
              Limited Time Offer! 🎉
            </h2>
            <p className="text-lg font-medium mt-2">
              Use coupon code{" "}
              <span className="bg-white text-blue-800 font-bold px-2 py-1 rounded">
                DISCOUNT10
              </span>{" "}
              and get <span className="text-yellow-300 font-bold">10% OFF</span>{" "}
              on your next purchase!
            </p>
          </div>

          {/* Call-to-Action Button */}
          <div>
            <button className="bg-yellow-400 text-blue-800 hover:bg-yellow-300 hover:text-blue-900 transition duration-300 px-6 py-3 rounded-lg font-semibold shadow-lg">
              Claim Your Discount
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountCard;
