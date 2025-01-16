// ErrorBoundary.js
import React from "react";
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-200">
        {/* <!-- SVG Icon --> */}
        <div className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-32 h-32 text-red-500">
            <circle cx="32" cy="32" r="30" fill="#FCE4EC" />
            <path
              d="M32 16 L32 36 M32 48 A1.5 1.5 0 1 1 32 48.001"
              stroke="#E91E63"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      
        {/* <!-- Heading --> */}
        <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something Went Wrong</h1>
      
        {/* <!-- Message --> */}
        <p className="text-lg text-gray-700 text-center max-w-md mb-6">
          We could’t process your request at this time. Please refresh the page or try again later. If the issue persists, contact support.
        </p>
      
        {/* <!-- Button --> */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-2 rounded-md shadow-lg transition duration-300"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
      
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,  // `children` can be any renderable content (like string, JSX, etc.)
};

export default ErrorBoundary;
