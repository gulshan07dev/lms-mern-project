import React from "react";
import { BsQuote } from "react-icons/bs";

export default function CarouselSlide({ details }) {
  return (
    <div className="md:w-auto w-full flex md:flex-row flex-col gap-7 mx-auto md:h-[350px] h-[550px] overflow-hidden">
      <img
        src={details.image}
        alt={`${details.title}Image`}
        className="md:h-[75%] h-[210px] md:self-end self-center rounded-full rounded-ss-sm rounded-e-0 dark:bg-[#ef9eff] bg-[#3392ff] pl-0 pb-0 p-8"
      />
      <div className="flex flex-col md:gap-10 gap-6">
        <h2 className="md:text-5xl font-inter text-3xl w-fit text-purple-800 dark:text-violet-400 font-semibold md:self-auto self-center relative after:content-[' '] after:w-[60%] after:h-1 rounded-full after:bg-purple-500 dark:after:bg-white after:absolute after:-bottom-3 after:left-0">
          {details.title}
        </h2>

        <p className="flex flex-col gap-0">
          <BsQuote
            size={60}
            className=" text-blue-500 dark:text-red-400 font-semibold"
          />
          <span className="text-gray-900 md:text-2xl text-lg dark:text-white font-lato font-[500] px-10">
            {details.description}
          </span>
          <BsQuote
            size={50}
            className=" text-blue-500 dark:text-red font-semibold self-end rotate-180"
          />
        </p>
      </div>
    </div>
  );
}
