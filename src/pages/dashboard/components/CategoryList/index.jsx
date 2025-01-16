import { Link } from "react-router-dom";

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: "Clothes",
      path: "men-section",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
    },

    {
      id: 2,
      name: "Electronics",
      path: "electronics",
      image: "https://i.imgur.com/ZANVnHE.jpeg",
    },

    {
      id: 3,
      name: "Furniture",
      path: "decoration",
      image: "https://i.imgur.com/Qphac99.jpeg",
    },

    {
      id: 4,
      name: "Women-Shoes",
      path: "women-section",
      image: "https://i.imgur.com/qNOjJje.jpeg",
    },

    {
      id: 5,
      name: "Sports",
      path: "sport-section",
      image: "https://i.imgur.com/BG8J0Fj.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Product Categories
      </h2>

      {/* Loader while fetching categories */}
      {categories.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-600 animate-pulse">Loading categories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {/* Loop through categories and display them */}
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center hover:scale-105 transition-all"
            >
              <Link to={`/product/${category.path}`} className="group">
                {/* Category Image */}
                <div className="w-24 h-24 mb-4 relative overflow-hidden rounded-full">
                  <img
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:opacity-80 transition-all"
                    loading="lazy" // Lazy load the image for better performance
                  />
                </div>

                {/* Category Name */}
                <h3 className="text-lg font-semibold text-gray-800 capitalize transition-all group-hover:text-indigo-600">
                  {category.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
