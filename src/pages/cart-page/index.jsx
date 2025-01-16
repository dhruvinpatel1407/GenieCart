import React, { useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAllFromCart } from "../../setup/store/actions";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner"

// Lazy load icons
const IoClose = React.lazy(() =>
  import("react-icons/io5").then((module) => ({ default: module.IoClose }))
);
const GiShoppingCart = React.lazy(() =>
  import("react-icons/gi").then((module) => ({
    default: module.GiShoppingCart,
  }))
);

// Lazy load CartButton component
const CartButton = React.lazy(() =>
  import("../dashboard/components/products/components/CartButton")
);

const CartPage = () => {
  const cart = useSelector((state) => state.cart); // Assuming cart is an array of items
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const isUserLoggedIn = Cookies.get("user");
  const shippingCharge = 50; // Example fixed shipping charge
  const packagingCharge = 20; // Example fixed packaging charge

  // Calculate subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Apply coupon discount
  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(subtotal * 0.1); // 10% discount
      setCouponMessage("Coupon applied successfully!");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code");
    }
  };

  // Calculate total
  const total = subtotal + shippingCharge + packagingCharge - discount;

  return (
    <div className="relative w-full">
      {/* Show logged-in message or wishlist */}
      {!isUserLoggedIn ? (
        <div className="min-h-screen" data-testid="not-logged-in">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center">
            <div className="text-center text-white px-8 py-6 bg-blue-900 rounded-lg shadow-lg">
              <p className="text-xl font-semibold mb-4">Your Cart is Empty.</p>
              <p className="mb-6">
                Log in to add items to your cart and start shopping.
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all"
              >
                Go to Login
              </button>
            </div>
          </div>{" "}
        </div>
      ) : cart.length === 0 ? (
        // Show empty wishlist message if no items are found
        <div className="flex justify-center items-center h-full py-20 bg-gray-100">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="text-7xl flex justify-center">
              <Suspense
                fallback={
                  <div>
                    <ColorRing
                      visible={true}
                      height="40"
                      width="40"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  </div>
                }
              >
                <GiShoppingCart />
              </Suspense>
            </div>

            <p
              className="text-3xl font-semibold text-gray-800 mb-4"
              data-testid="Empty Message"
            >
              Your Cart is Empty
            </p>
            <p className="text-lg text-gray-600 mb-6">
              It looks like you haven’t added anything to your cart yet. Browse
              our collection and start shopping now!
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all">
              <Link to="/dashboard">Start Shopping</Link>
            </button>
          </div>
        </div>
      ) : (
        // Display wishlist items in a table
        <Suspense fallback={<div>Loading CartButton...</div>}>
          <div className="flex flex-col lg:flex-row gap-4 p-6">
            {/* Cart Table */}
            <div className="lg:w-2/3 w-full overflow-x-auto">
              <table
                className="min-w-full table-auto border border-gray-200 bg-white rounded shadow-md"
                data-testid="cart-table"
              >
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Total</th>
                    <th className="px-4 py-2 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-4 py-2">
                        <img
                          src={item.images[0] || item.thumbnailImage}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="px-4 py-2" data-testid="cart-item-1">
                        {item.name || item.title}
                      </td>
                      <td className="px-4 py-2">${item.price}</td>
                      <td className="px-4 py-2">
                        {/* Lazy load CartButton component */}
                        <Suspense fallback={<div>Loading...</div>}>
                          <CartButton product={item} />
                        </Suspense>
                      </td>
                      <td className="px-4 py-2" data-testid="cart-item-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => dispatch(removeAllFromCart(item.id))}
                          className="text-black px-3 py-1"
                          data-testid="remove-item-1"
                        >
                          <Suspense fallback={<div>Loading...</div>}>
                            <IoClose />
                          </Suspense>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-1/3 w-full border border-gray-200 bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shippingCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging:</span>
                  <span>${packagingCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>${discount.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border w-full p-2 rounded mb-2"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-blue-500 text-white px-4 py-2 w-full rounded"
                  data-testid="apply-coupon-button"
                >
                  Apply Coupon
                </button>
                {couponMessage && (
                  <p
                    data-testid="coupon-message"
                    className={`mt-2 ${
                      couponMessage.includes("Invalid")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}
                <button className="text-black border border-black mt-2 hover:bg-gray-200 px-4 py-2 w-full rounded">
                  Place Your Order
                </button>
              </div>
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default CartPage;
