import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const categories = [
  { name: "Home", path: "/dashboard" },
  { name: "Men", path: "product/men-section" },
  { name: "Women", path: "product/women-section" },
  { name: "Sports", path: "product/sport-section" },
  { name: "Electronics", path: "product/electronics" },
  { name: "Groceries", path: "product/groceries" },
  { name: "Decoration", path: "product/decoration" },
];

const CategoryMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="p-4 bg-gradient-to-b from-blue-100 to-blue-50">
      {/* Category Button for Small and Medium Screens */}
      <div className="md:hidden">
        <button
          data-testid="sm-screen-button"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          <AiOutlineMenu className="text-xl" />
          <span>Categories</span>
        </button>
        {menuOpen && (
          <div
            className="mt-4 bg-white shadow-lg rounded-lg border border-gray-200"
            role="menu"
            data-testid="sm-Category-menu"
          >
            <ul className="flex flex-col gap-4 p-4 text-lg text-gray-700">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.path}
                    onClick={closeMenu}
                    role="menuitem"
                    className="hover:text-blue-600 transition"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Horizontal Menu for Large Screens */}
      <div
        className="hidden md:flex flex-row flex-wrap gap-8 px-8 py-4 bg-blue-50 shadow-lg rounded-lg"
        data-testid="lg-Category-menu"
      >
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.path}
            className="hover:text-blue-600 transition text-gray-700"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
