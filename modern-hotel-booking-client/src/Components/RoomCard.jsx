import { Star } from "lucide-react";
import React from "react";
import { FaUsers, FaRulerCombined, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router";

const RoomCard = ({ room }) => {
  return (
    <Link to={`/rooms/${room?._id}`}>
      <div className="rounded-lg overflow-hidden shadow-md bg-white">
        <img
          src={room?.images[0]} // Replace with your own image
          alt="Room"
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          {/* room avilable badge */}
          {room?.isAvailable ? (
            <div className="badge badge-success text-white mb-2">
              <svg
                className="size-[1em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  fill="currentColor"
                  strokeLinejoin="miter"
                  strokeLinecap="butt"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="square"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  ></circle>
                  <polyline
                    points="7 13 10 16 17 8"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="square"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  ></polyline>
                </g>
              </svg>
              Available
            </div>
          ) : (
            <div className="badge badge-error text-white mb-2">
              <svg
                className="size-[1em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor">
                  <rect
                    x="1.972"
                    y="11"
                    width="20.056"
                    height="2"
                    transform="translate(-4.971 12) rotate(-45)"
                    fill="currentColor"
                    strokeWidth={0}
                  ></rect>
                  <path
                    d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                    strokeWidth={0}
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
              Not Available
            </div>
          )}

          <h2 className="text-lg font-semibold">{room?.name}</h2>
          <p className="text-sm text-gray-500 mb-3">{room?.location}</p>

          <div className="grid grid-cols-3 gap-2 text-center text-sm text-gray-700 border-t border-b py-3">
            <div>
              <FaUsers className="mx-auto mb-1" size={20} />
              <p>Person</p>
              <p className="font-semibold">{room?.roomCapacity}</p>
            </div>
            <div>
              <Star className="mx-auto mb-1" size={20} />
              <p>Hotel Type</p>
              <p className="font-semibold">{room?.hotelType}</p>
            </div>
            <div>
              <FaMoneyBillWave className="mx-auto mb-1" size={20} />
              <p>PRICE</p>
              <p className="font-semibold">${room?.pricePerNight}</p>
            </div>
          </div>

          <button className="w-full mt-3 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
            BOOK NOW!
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
