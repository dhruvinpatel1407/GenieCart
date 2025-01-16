import React, { Suspense } from "react";
import {Link} from "react-router-dom";
// Lazy loading icons
const FaFacebook = React.lazy(() =>
  import("react-icons/fa").then((mod) => ({ default: mod.FaFacebook }))
);
const FaInstagram = React.lazy(() =>
  import("react-icons/fa").then((mod) => ({ default: mod.FaInstagram }))
);
const FaYoutube = React.lazy(() =>
  import("react-icons/fa").then((mod) => ({ default: mod.FaYoutube }))
);
const FaGooglePay = React.lazy(() =>
  import("react-icons/fa").then((mod) => ({ default: mod.FaGooglePay }))
);
const FaApplePay = React.lazy(() =>
  import("react-icons/fa").then((mod) => ({ default: mod.FaApplePay }))
);
const FaCcVisa = React.lazy(() =>
  import("react-icons/fa").then((mod) => ({ default: mod.FaCcVisa }))
);
const FaCcMastercard = React.lazy(() =>
  import("react-icons/fa").then((mod) => ({ default: mod.FaCcMastercard }))
);
const CgPaypal = React.lazy(() =>
  import("react-icons/cg").then((mod) => ({ default: mod.CgPaypal }))
);
const FaXTwitter = React.lazy(() =>
  import("react-icons/fa6").then((mod) => ({ default: mod.FaXTwitter }))
);

const Footer = () => {
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <div className="bg-gradient-to-t from-blue-900 to-indigo-800 text-white">
        {/* Logo Section */}
        <div className="flex justify-center py-8" id="footer-logo-section">
          <img
            src="/assets/images/Capture 2.PNG"
            alt="GenieCart Logo"
            data-testid="GenieCart Logo"
            className="w-40 sm:w-64"
          />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 p-4 mx-auto max-w-screen-xl">
          {/* About Section */}
          <div id="footer-about-section" data-testid="GenieCart">
            <p className="text-2xl font-bold text-gray-100 mb-4">GenieCart</p>
            <div>
              <span className="text-lg font-medium text-gray-300">
                Address:
              </span>
              <p className="text-gray-400 mt-2">
                RK Prime, 150 foot Ring Road <br className="hidden sm:block" />
                Rajkot, Gujarat, India
              </p>
            </div>
            <div className="flex flex-wrap space-x-4 mt-6 text-2xl justify-start">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
                key="facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
                key="instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
                key="twitter"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="YouTube"
                key="youtube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Information Section */}
          <div id="footer-information-section" data-testid="Information">
            <p className="text-lg font-medium text-gray-200 mb-4">
              Information
            </p>
            <ul className="space-y-2 text-gray-400 hover:text-gray-100 transition-all">
              {[
                "About Us",
                "Career",
                "Terms & Conditions",
                "Contact Us",
                "GinieCart Stories",
              ].map((info, index) => (
                <li key={index} className="hover:text-blue-300 cursor-pointer">
                  {info}
                </li>
              ))}
            </ul>
          </div>

          {/* My Account Section */}
          <div id="footer-my-account-section" data-testid="My Account">
            <p className="text-lg font-medium text-gray-200 mb-4">My Account</p>
            <ul className="space-y-2 text-gray-400 hover:text-gray-100 transition-all">
              {[
                { name: "Account Details", link: null },
                { name: "Wishlist", link: "/wishlist" }, 
                { name: "Order Tracking", link: "/cart" }, 
                { name: "Past Orders", link: null },
                { name: "Addresses", link: null },
              ].map((account, index) => (
                <li key={index} className="hover:text-blue-300 cursor-pointer">
                  {account.link ? (
                    <Link to={account.link} className="hover:text-blue-300">
                      {account.name}
                    </Link>
                  ) : (
                    account.name
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div id="footer-help-section" data-testid="Help">
            <p className="text-lg font-medium text-gray-200 mb-4">Help</p>
            <ul className="space-y-2 text-gray-400 hover:text-gray-100 transition-all">
              {[
                "Payments",
                "Shipping",
                "Cancellation & Return Policy",
                "FAQ",
              ].map((help, index) => (
                <li key={index} className="hover:text-blue-300 cursor-pointer">
                  {help}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-gray-600 my-6 mx-auto max-w-screen-xl" />

        {/* Footer Bottom Section */}
        <div className="flex flex-wrap justify-between items-center p-4 max-w-screen-xl mx-auto">
          {/* Copyright */}
          <div id="footer-copyright" data-testid="GenieCartCopy">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              &copy; 2024 GenieCart. All Rights Reserved.
            </p>
          </div>

          {/* Payment Icons */}
          <div
            className="flex flex-wrap space-x-6 text-3xl mt-4 md:mt-0 justify-center sm:justify-end"
            id="footer-payment-icons"
          >
            {[
              { icon: <FaCcVisa />, label: "Visa" },
              { icon: <FaCcMastercard />, label: "Mastercard" },
              { icon: <FaGooglePay />, label: "GooglePay" },
              { icon: <CgPaypal />, label: "PayPal" },
              { icon: <FaApplePay />, label: "ApplePay" },
            ].map(({ icon, label }, index) => (
              <div
                className="text-gray-400 hover:text-indigo-500 transition-colors"
                aria-label={`Payment Method ${index + 1}`}
                key={label}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Footer;
