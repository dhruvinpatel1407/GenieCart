import { Parallax } from "react-parallax";
import ourproductsbanner from "/assets/images/ourproductsbanner.avif";
import ourproductsidebanner from "/assets/images/ourproductsidebanner.avif";

const OurProduct = () => {
  return (
    <div className="flex flex-col">
      {/* First Line: Parallax Section with Banner Image */}
      {/* Lazy loading of image with parallax effect */}
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={ourproductsbanner}
        strength={100}
        className="lg:h-96 md:h-72 h-48 object-cover w-full bg-cover bg-center"
        bgImageAlt="Product Banner"
      >
        {/* Empty content as Parallax component itself handles the background */}
      </Parallax>

      {/* Second Line: Our Story and Explore Collection */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Left Side: Our Story Section */}
        <div className="flex-1 mx-4 md:my-0 my-4 text-center border border-black p-4 md:text-left py-10 bg-gradient-to-r from-white to-gray-50">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6">
            OUR STORY
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At GenieCart, we are passionate about providing the latest fashion
            trends to our customers. With a focus on quality and style, we aim
            to make your shopping experience seamless and enjoyable. Explore our
            wide range of clothing and accessories to find your perfect look.
          </p>
        </div>

        {/* Right Side: Explore Collection Parallax Section */}
        {/* Only display parallax image on larger screens (lg and up) */}
        <div className="flex-1 hidden md:block">
          <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={ourproductsidebanner}
            strength={-300}
            className="lg:h-96 md:h-80 h-52 object-cover w-full bg-cover bg-center"
            bgImageAlt="Side Banner"
          >
            {/* Empty content as Parallax component itself handles the background */}
          </Parallax>
        </div>
      </div>
    </div>
  );
};

export default OurProduct;
