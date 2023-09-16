import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaBook, FaUser } from "react-icons/fa";

export default function CourseCard({ data }) {
  const navigate = useNavigate();
 

  return (
    <div 
      className="md:w-[22rem] w-[95%] md:h-[445px] h-[500px] shadow-custom dark:shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-white dark:bg-zinc-700 transition-transform transform hover:scale-[1.01]"
    onClick={() => navigate("/courses/description/", {state: {...data}})}
    >
      <div className="relative overflow-hidden">
        <img
          className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale-[1.05] transition-all ease-in-out duration-300"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
        <div className="absolute top-2 right-2 p-2 bg-white dark:bg-zinc-700 rounded-full">
          <FaPlay className="text-yellow-500 dark:text-yellow-400 text-xl" />
        </div>
      </div>
      <div className="p-4 md:space-y-2 space-y-3 text-gray-800 dark:text-white">
        <h2 className="text-2xl font-semibold line-clamp-2">{data?.title}</h2>
        <p className="line-clamp-2 font-nunito-sans text-base font-[500]">
          {data?.description}
        </p>
        <div className="flex items-center space-x-2">
          <FaBook className="text-yellow-500 dark:text-yellow-400" />
          <p className="text-base font-semibold">Category: {data?.category}</p>
        </div>
        <div className="flex items-center space-x-2">
          <FaBook className="text-yellow-500 dark:text-yellow-400" />
          <p className="text-base font-semibold">
            Total lectures: {data?.numberoflectures}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaUser className="text-yellow-500 dark:text-yellow-400" />
          <p className="text-base font-semibold">
            Instructor: {data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
}
