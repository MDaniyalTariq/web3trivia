import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Card = (props) => {
  const { review } = props;

  return (
    <div className="flex flex-col items-center  rounded-lg shadow-lg ">
      <div className="relative">
        <img
          className="aspect-square rounded-full w-[140px] h-[140px] z-20"
          src={review.image}
          alt={review.name} 
        />
        <div className="w-[140px] h-[140px] bg-violet-500 rounded-full absolute top-0 left-0 transform translate-x-2 translate-y-2"></div>
      </div>

      <div className="text-center mt-5">
        <p className="tracking-wider font-bold text-2xl capitalize text-white">
          {review.name}
        </p>
        <p className="text-gray-400 uppercase text-sm">{review.job}</p>
      </div>

      <div className="flex justify-center items-center mt-4 text-white z-40">
        <FaQuoteLeft className="text-3xl" />
      </div>

      <div className="text-center mt-4 text-white px-4">
        <p className="text-lg italic">{review.text}</p>
      </div>

      <div className="flex justify-center items-center mt-4 text-white z-40">
        <FaQuoteRight className="text-3xl" />
      </div>
    </div>
  );
};

export default Card;
