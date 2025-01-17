import { useState, useEffect } from "react";
import PropTypes from 'prop-types';


 // Function to calculate the time left until the sale ends
 function calculateTimeLeft(saleEndTime) {
  const now = new Date();
  const difference = new Date(saleEndTime) - now;

  // If sale has not ended, calculate time left
  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return { days, hours, minutes, seconds };
  } else {
    return null; // Sale has ended
  }
}


const SaleCountdown = ({ saleEndTime }) => {
  // State to store the time left until the sale ends
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(saleEndTime));

 

  // Array to store the time units for easier rendering
  const Time = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Minutes", value: timeLeft?.minutes },
    { label: "Seconds", value: timeLeft?.seconds },
  ];

  // Set an interval to update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(saleEndTime));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount to avoid memory leaks
  }, [saleEndTime]);

  // If timeLeft is null, display "Sale has ended"
  if (!timeLeft) {
    return (
      <div className="text-center text-2xl text-red-600">Sale has ended!</div>
    );
  }

  return (
    <div className="relative flex flex-col items-center bg-gradient-to-br from-purple-50 via-pink-100 to-purple-50 p-8 rounded-lg shadow-xl text-center">
      {/* Header Section */}
      <h2 className="text-4xl font-extrabold text-purple-900 sm:text-5xl">
        Flash Sale Ending Soon!
      </h2>
      <p className="mt-2 text-lg text-purple-700 sm:text-xl">
        Unbeatable deals on your favorite items. Shop now before the clock runs
        out!
      </p>

      {/* Countdown Timer Section */}
      <div className="flex gap-4 mt-6 text-base font-medium text-gray-700 sm:text-lg md:text-xl">
        {Time.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center p-4 bg-pink-100 rounded-md shadow-md"
          >
            <span className="md:text-5xl sm:text-4xl text-3xl  font-bold text-pink-700">
              {unit.value || 0} {/* Fallback to 0 if value is undefined */}
            </span>
            <span className="text-sm text-purple-600 sm:text-base">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Call-to-Action Button */}
      <button className="mt-6 px-8 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300">
        Grab Deals Now
      </button>
    </div>
  );
};

SaleCountdown.propTypes = {
  saleEndTime: PropTypes.string.isRequired, 
};

export default SaleCountdown;
