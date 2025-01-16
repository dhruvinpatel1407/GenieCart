import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import OurProduct from "./OurProducts";
import SaleCountdown from "./SaleEndTimer";
import TopPicksSection from "./TopSale";
import DiscountCard from "./discount";

const Banner = () => {
  const saleEndTime = "2025-01-28T23:59:59"; // End time for the sale countdown

  return (
    <>
      <div className="p-4">
        {/* Responsive Grid Section */}
        <div className="w-full">
          {/* Carousel Section  */}
          <div className="w-full flex flex-col gap-2">
            <Carousel
              showThumbs={false}
              infiniteLoop
              showStatus={false}
              className="overflow-hidden"
            >
              {/* Carousel Images with lazy loading */}
              <div className="relative">
                <img
                  src="/assets/images/slider1.png"
                  alt="Carousel 1"
                  className="w-full h-[200px] sm:h-[350px] lg:h-[400px] object-cover"
                  loading="lazy" // Added lazy loading
                />
              </div>
              <div className="relative">
                <img
                  src="/assets/images/slider2.png"
                  alt="Carousel 2"
                  className="w-full h-[200px] sm:h-[350px] lg:h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative">
                <img
                  src="/assets/images/slider3.jpg"
                  alt="Carousel 3"
                  className="w-full h-[200px] sm:h-[350px] lg:h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
            </Carousel>
          </div>
        </div>

        {/* Bottom Section for Screens */}
        <div className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Top Right Image */}
            <div className="relative">
              <div className="flex justify-end">
                <img
                  src="/assets/images/slider-left.png"
                  alt="Top Right"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Bottom Right Image */}
            <div className="relative">
              <div className="flex justify-center">
                <img
                  src="/assets/images/F.png"
                  alt="Bottom Right"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* discount coupan advertisement  */}
      <DiscountCard />

      {/* cloth products advertisement  */}
      <div className="mt-8">
        <OurProduct />
      </div>

      {/* Product and Sale Countdown Sections */}
      <SaleCountdown saleEndTime={saleEndTime} />

      {/* Top sales advertisement */}
      <TopPicksSection />
    </>
  );
};

export default Banner;
