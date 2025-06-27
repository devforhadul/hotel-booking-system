import React, { useRef } from "react";

const TopCity = () => {
  // Data for the city cards
  const cities = [
    {
      name: "Cox's Bazar",
      imageUrl: "https://zen.wego.com/cdn-cgi/image/height=480/destinations/cities/CXB.jpg",
    },
    {
      name: "Dhaka",
      imageUrl: "https://zen.wego.com/cdn-cgi/image/height=480/destinations/cities/DAC.jpg",
    },
    {
      name: "Sylhet",
      imageUrl: "https://zen.wego.com/cdn-cgi/image/height=480/destinations/cities/ZYL.jpg",
    },
    {
      name: "Chittagong",
      imageUrl: "https://zen.wego.com/cdn-cgi/image/height=480/destinations/cities/CGP.jpg",
    },
    {
      name: "Dubai",
      imageUrl: "https://zen.wego.com/cdn-cgi/image/height=480/destinations/cities/DXB.jpg",
    },
    {
      name: "Bangkok",
      imageUrl: "https://zen.wego.com/cdn-cgi/image/height=480/destinations/cities/BKK.jpg",
    },
    {
      name: "Kuala Lumpur",
      imageUrl: "https://zen.wego.com/cdn-cgi/image/height=480/destinations/cities/KUL.jpg",
    },
  ];

  // Create a ref for the scrollable container
  const scrollContainerRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Scroll by 300px to the left
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Scroll by 300px to the right
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-10 sm:p-6 lg:p-8 font-['Inter']">
        <style>
        {`
          /* For Webkit browsers (Chrome, Safari) */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          /* For IE, Edge and Firefox */
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>
      <div className="w-11/12 mx-auto">
        {/* Title section */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 px-2">
          Hotels In Top Cities 
        </h2>

        {/* Cards container with horizontal scroll and navigation buttons */}
        <div className="relative flex items-center ">
          {/* Left Navigation Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden sm:flex"
            aria-label="Scroll left"
          >
            {/* SVG for left arrow icon */}
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          {/* Scrollable cards container */}
          <div
            ref={scrollContainerRef} // Assign ref to this div
            className="flex overflow-x-scroll space-x-4 pb-4 px-2 scrollbar-hide flex-grow" // Changed from overflow-x-auto to overflow-x-scroll and added custom scrollbar-hide
          >
            {cities.map((city, index) => (
              <div
                key={index}
                className="flex-none w-48 sm:w-56 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                {/* Image section */}
                <div className="w-full h-70 rounded-t-xl overflow-hidden">
                  <img
                    src={city.imageUrl}
                    alt={city.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x300/cccccc/333333?text=Error`;
                    }}
                  />
                </div>
                {/* City name section */}
                <div className="p-4 text-center">
                  <p className="text-lg font-semibold text-gray-700">
                    {city.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden sm:flex"
            aria-label="Scroll right"
          >
            {/* SVG for right arrow icon */}
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopCity;
