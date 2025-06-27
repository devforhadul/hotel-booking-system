import { Star } from "lucide-react";
import React from "react";

const ReviewCard = ({ review }) => {
 // console.log(review?.photo)
  return (
    <div>
      <div className="bg-blue-50 shadow-lg rounded-xl p-6 mb-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <img
              src={
                review?.photo ||
                "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?semt=ais_hybrid&w=740"
              }
              alt={review?.userName || "User"}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{review?.name || "Anonymous"}</p>
              <p className="text-sm text-gray-500">{review?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1"><Star size={20}></Star>{review?.reviewRating}</div>
        </div>
        <p className="text-gray-700">
          {review?.description || "No review provided."}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
