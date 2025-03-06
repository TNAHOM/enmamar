import Image from "next/image";
import React from "react";

const categories = [
  { id: 1, name: "Development", image: "/Images/development" },
  { id: 2, name: "Business", image: "/Images/Buisness" },
  { id: 3, name: "Design", image: "/Images/Design" },
  { id: 4, name: "Marketing", image: "/Images/Marketing" },
  { id: 5, name: "Health & Fitness", image: "/Images/HealthFitness" },
  { id: 7, name: "Others", image: "/Images/HealthFitness" },
];

const Filter = () => {
  return (
    <div className="flex flex-wrap justify-center gap-5 my-8">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`flex flex-col items-center w-32 p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-1 hover:border-[#FF5722]
                  "border-[#FF5722] bg-[#FFF0EB]"`}
        >
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <div className="relative w-8 h-8">
              <Image
                src={`${category.image}.png`}
                alt={`${category.name} icon`}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-sm font-medium text-center">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Filter;
