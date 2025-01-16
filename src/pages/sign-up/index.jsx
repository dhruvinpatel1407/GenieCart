import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../../setup/store/actions"; 
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formvalid, setFormValid] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const users = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router navigation

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "name":
        validateName(value);
        break;
      case "email":
        validateEmail(value);
        break;
      case "password":
        validatePassword(value);
        break;
      default:
        break;
    }
  };

  const validateName = (name) => {
    let error = "";
    let valid = true;

    if (!name.trim()) {
      error = "Please Enter your name";
      valid = false;
    } else if (name.trim().length < 3) {
      error = "Please Enter your full name";
      valid = false;
    }

    setFullName(name);
    setNameError(error);
    setFormValid(valid);
    return valid;
  };

  const validateEmail = (email) => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let error = "";
    let valid = true;

    if (!regex.test(email)) {
      error = "Please Enter a valid email";
      valid = false;
    }

    setEmail(email);
    setEmailError(error);
    setFormValid(valid);
    return valid;
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    let error = "";
    let valid = true;

    if (!regex.test(password)) {
      error = "Password must have 8 characters, including digits, uppercase & lowercase letters";
      valid = false;
    }

    setPassword(password);
    setPasswordError(error);
    setFormValid(valid);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail(email) && validatePassword(password) && validateName(fullname)) {
      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        toast.error("Email is already registered. Try a new email.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        const userdata = { fullname, email, password };
        dispatch(adduser(userdata));
        setFullName("");
        setEmail("");
        setPassword("");
        toast.success("Account Created Successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/login"), 3000); // Navigate to login after a delay
      }
    }
  };

  return (
    <div className="relative w-full h-full py-20 md:py-0 md:h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <div className="relative w-full max-w-lg md:mx-0 mx-4 bg-white shadow-xl rounded-lg overflow-hidden">
        <ToastContainer /> {/* Toast container for displaying messages */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-6">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="mt-2 text-sm">Join us today and explore amazing features</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <p className="text-red-500 text-xs mt-1">{nameError}</p>
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all"
            >
              Signup
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-500 font-medium cursor-pointer hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
