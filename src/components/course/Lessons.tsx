import React from "react";
import { lessons } from "@/utilities/mock";
import { useState } from "react";

const Lessons = () => {
  const [activeDay, setActiveDay] = useState<number | null>(1);

  return (
    <div className="p-3 border rounded-xl shadow-sm font-sans ">
      <div className="mb-2">
        <p className="text-2xl font-medium">Course Lessons</p>
        <p className="text-gray-500 font-normal text-lg">
          A comprehensive learning leasons
        </p>
      </div>
      <div className="space-y-3 overflow-hidden h-[600px] overflow-y-auto py-4">
        {lessons.map((item, index) => (
          <div
            key={item.day}
            className={` py-4 px-5 transition-colors duration-200 text-lg rounded-md font-medium cursor-pointer ${
              activeDay === item.day
                ? "text-purpleStandard bg-purple-200 border-gray-200 border "
                : "hover:bg-gray-100 "
            }`}
            onClick={() => setActiveDay(item.day)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  activeDay === item.day
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <span>
                <span className="font-medium">Lesson {item.day}: </span>
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
