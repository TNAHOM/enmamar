"use client";

import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
}

const CourseCard = ({
  id,
  title,
  instructor,
  description,
  price,
  image,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rating,
}: CourseCardProps) => {
  return (
    <Link href={`/course/${id}`} className="no-underline">
      <div className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100">
        {/* Course thumbnail with hover effect */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
          <Image
            src={image || "/Images/thumbnail.webp"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 text-xs font-semibold rounded-full z-20">
            {price === 0 ? "FREE" : `${price} Br.`}
          </div>
        </div>

        {/* Course content */}
        <div className="flex flex-col flex-grow p-4 space-y-2">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-lg line-clamp-2 hover:text-purple-600 transition-colors">
              <Link href={`/course/${id}`}>{title}</Link>
            </h3>
          </div>

          <p className="text-sm text-gray-400">
            Instructor:{" "}
            <span className="font-medium text-gray-600">{instructor}</span>
          </p>

          <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center mt-auto pt-3 border-t border-gray-100">
            {/* <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : i < rating
                    ? "fill-yellow-400 text-yellow-400 fill-[50%]"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-sm font-medium text-gray-700">
              {rating.toFixed(1)}
            </span>
          </div> */}

            {/* <Link
            href={`/course/${id}`}
            className="ml-auto bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-medium py-1 px-3 rounded-full transition-colors"
          >
            See more
          </Link> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
