import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
      {/* SVG Illustration */}
      <div className="w-40 text-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-ful h-full text-center text-red-500"
        >
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v6h-2zM11 15h2v2h-2z" />
        </svg>
      </div>

      {/* Text Content */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-lg mb-6">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-white text-blue-700 font-medium text-lg rounded-full shadow-lg hover:bg-gray-200 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
