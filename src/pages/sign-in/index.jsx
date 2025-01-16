import { useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Formlogin() {
  // State Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formvalid, setFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Access user data from Redux store
  const users = useSelector((state) => state.User);

  // Navigation hook
  const navigate = useNavigate();

  // Handle input change (email or password)
  const handlechange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      validateEmail(value);
    } else if (id === "password") {
      validatePassword(value);
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let error = "";
    let valid = formvalid;

    if (!regex.test(email)) {
      error = "Please Enter valid email";
      valid = false;
    } else {
      error = "";
      valid = true;
    }

    setEmail(email);
    setEmailError(error);
    setFormValid(valid);

    return valid;
  };

  // Password validation function
  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    let error = "";
    let valid = formvalid;

    if (!regex.test(password)) {
      error = "Please Enter valid password";
      valid = false;
    } else {
      error = "";
      valid = true;
    }

    setPassword(password);
    setPasswordError(error);
    setFormValid(valid);

    return valid;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail(email) && validatePassword(password)) {
      const user = users.find((user) => user.email === email);
      console.log(user);
      if (user) {
        if (user.password === password) {
          // Save user email in cookies for 7 days
          Cookies.set("user", user.fullname, { expires: 7 });
          toast.success("Successfully Logged In", {
            position: "top-right",
            autoClose: 3000,
            className: "bg-green-500 text-white font-bold",
            bodyClassName: "text-sm",
          });
          setEmail("");
          setPassword("");
          setTimeout(() => navigate("/dashboard"), 3000);  // Redirect to dashboard
          
        } else {
          toast.error("Invalid Password...", {
            position: "top-right",
            autoClose: 3000,
            className: "bg-green-500 text-white font-bold",
            bodyClassName: "text-sm",
          });
        }
      } else {
        toast.error("This email is not registered. Please create an account first.", {
          position: "top-right",
          autoClose: 3000,
          className: "bg-green-500 text-white font-bold",
          bodyClassName: "text-sm",
        });
        setTimeout(() => navigate("/signup"), 3000);
      }
    }
  };

  return (
    <div className="relative w-full h-full py-20 md:py-0 md:h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white shadow-lg md:mx-0 mx-4 rounded-lg overflow-hidden">
        {/* Top Section with Logo or Heading */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="mt-2 text-sm">Login to access your account</p>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handlechange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-describedby="emailError"
              />
              {/* Email Error Message */}
              <p id="emailError" className="text-red-500 text-sm">{emailError}</p>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlechange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-describedby="passwordError"
              />
              {/* Password Error Message */}
              <p id="passwordError" className="text-red-500 text-sm">{passwordError}</p>
              <p className="text-gray-500 text-sm mt-1">
                Password must include at least 8 characters, an uppercase letter, and a number.
              </p>
            </div>

            {/* Remember Me Checkbox (not used currently, but available for future functionality) */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberme"
                name="rememberme"
                onChange={handlechange}
                className="text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
              />
              <label htmlFor="rememberme" className="ml-2 text-gray-700 text-sm">
                Remember Me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
            >
              Login
            </button>

            {/* Forgot Password Link */}
            <p className="text-center text-sm text-blue-500 mt-2 hover:underline cursor-pointer">
              Forgot Password?
            </p>

            {/* Create Account Link */}
            <p className="text-center text-sm text-gray-700 mt-4">
              New here?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Formlogin;
