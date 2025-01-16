import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetWomensItemsData } from "../../../../setup/store/actions";
import FilterList from "./components/Filter";

const WomenSection = () => {
  const Data = useSelector((state) => state.WomensItemsData);
  const dispatch = useDispatch();
  //  console.log(Data);

  useEffect(() => {
    dispatch(GetWomensItemsData());
  }, [dispatch]);

  return (
    <div>
      <div className="relative w-full text-center py-12 px-4 bg-gradient-to-r from-blue-50 via-white to-blue-50">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-cyan-100 to-blue-300 opacity-80 blur-2xl"></div>

        {/* Header Content */}
        <h1 className="relative font-bold text-3xl sm:text-4xl md:text-5xl text-blue-900">
          Welcome to the Women’s Section
        </h1>
        <p className="relative mt-2 text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Explore a curated collection of timeless fashion and modern trends,
          designed to inspire and empower.
        </p>

        {/* Decorative Line */}
        <div className="relative mx-auto mt-6 w-16 h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 rounded"></div>

        {/* Call-to-Action Button */}
        <div className="relative mt-6">
          <button className="px-8 py-3 rounded-full bg-cyan-600 text-white text-sm md:text-base font-medium shadow-md hover:shadow-lg hover:bg-cyan-700 transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>

      {/* Lazy load FilterList if it becomes heavy */}

      <React.Suspense fallback={<div>Loading...</div>}>
        <FilterList allProducts={Data} dataTestid="Women's-Items" />
      </React.Suspense>
    </div>
  );
};

export default WomenSection;
