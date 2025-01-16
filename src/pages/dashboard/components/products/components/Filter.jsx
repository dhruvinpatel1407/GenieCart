import { useState, useEffect } from "react";
import ProductList from "./ProductCard";
import PropTypes from "prop-types";

const FilterList = ({ allProducts, dataTestid }) => {
  const [filteredProducts, setFilteredProducts] = useState([]); // Stores filtered product list
  const [selectedCategories, setSelectedCategories] = useState({}); // Stores selected categories for filtering
  const [showFilters, setShowFilters] = useState(false); // Toggles the filter visibility

  // Helper function to flatten nested products into a single array
  const flattenProducts = (productsData) => {
    return Object.entries(productsData).flatMap(([category, data]) =>
      (data.products || []).map((product) => ({ ...product, category }))
    );
  };

  // Set filtered products whenever allProducts changes
  useEffect(() => {
    const allFlattenedProducts = flattenProducts(allProducts);
    setFilteredProducts(allFlattenedProducts);
  }, [allProducts]);

  // Filter products by selected categories
  const filteredByCategory = filteredProducts.filter((product) => {
    if (Object.keys(selectedCategories).length === 0) return true;
    return selectedCategories[product.category];
  });

  // Sorting functions
  const handleSortByPrice = (order) => {
    const sorted = [...filteredByCategory].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  const handleSortByRating = () => {
    const sorted = [...filteredByCategory].sort((a, b) => b.rating - a.rating);
    setFilteredProducts(sorted);
  };

  const handleResetFilters = () => {
    const allFlattenedProducts = flattenProducts(allProducts);
    setFilteredProducts(allFlattenedProducts);
    setSelectedCategories({});
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = { ...prev };
      if (updatedCategories[category]) {
        delete updatedCategories[category];
      } else {
        updatedCategories[category] = true;
      }
      return updatedCategories;
    });
  };

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowFilters(true)} // Show side menu
          className="border border-black me-8 mt-2 text-black px-4 py-2 rounded-full hover:bg-blue-200"
        >
          Apply Filter
        </button>
      </div>

      {/* Side Menu and Overlay */}
      {showFilters && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowFilters(false)} // Close side menu
          ></div>

          {/* Side Menu */}
          <div className="fixed pt-20 top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-4 transform transition-transform duration-300">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-red-500 font-bold"
              >
                Close
              </button>
            </div>

            {/* Sort and Reset Filter Buttons */}
            <div className="mb-6">
              <button
                onClick={() => handleSortByPrice("asc")}
                className="block w-full border border-black text-black px-4 py-2 rounded-full hover:bg-blue-200 mb-2"
              >
                Price: Low to High
              </button>
              <button
                onClick={() => handleSortByPrice("desc")}
                className="block w-full border border-black text-black px-4 py-2 rounded-full hover:bg-blue-200 mb-2"
              >
                Price: High to Low
              </button>
              <button
                onClick={handleSortByRating}
                className="block w-full border border-black text-black px-4 py-2 rounded-full hover:bg-blue-200 mb-2"
              >
                Sort by Rating
              </button>
              <button
                onClick={handleResetFilters}
                className="block w-full border border-black text-black px-4 py-2 rounded-full hover:bg-blue-200"
              >
                Reset Filters
              </button>
            </div>

            {/* Category Checkbox Filters */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Filter by Category:
              </h3>
              {Object.entries(allProducts).map(([category]) => (
                <label key={category} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories[category] || false}
                    className="form-checkbox mr-2"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Product Grid */}
      <div className="grid gap-8 " data-testid={dataTestid}>
        {filteredByCategory.length > 0 ? (
          <ProductList products={filteredByCategory} />
        ) : (
          <p>No products found based on selected filters</p>
        )}
      </div>
    </div>
  );
};

// PropTypes validation
FilterList.propTypes = {
  allProducts: PropTypes.object.isRequired, // allProducts should be an object (product categories with product data)
  dataTestid: PropTypes.string.isRequired,  // dataTestid is a string for the data-testid attribute
};

export default FilterList;
