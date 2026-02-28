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
}: CourseCardProps) => {
  return (
    <Link href={`/course/${id}`} className="no-underline group block h-full">
      <article className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-amber-200/60 transition-all duration-300 flex flex-col h-full">
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <Image
            src={image || "/Images/thumbnail.webp"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-amber-500 text-slate-900 px-2.5 py-1 text-xs font-semibold rounded-full z-20 shadow-sm">
            {price === 0 ? "FREE" : `${price} Br.`}
          </div>
        </div>

        <div className="flex flex-col flex-grow p-4 space-y-2">
          <p className="font-heading font-semibold text-lg line-clamp-2 text-slate-800 group-hover:text-amber-700 transition-colors">
            {title}
          </p>

          <p className="text-sm text-slate-500">
            Instructor: <span className="font-medium text-slate-700">{instructor}</span>
          </p>

          <p className="text-sm text-slate-600 line-clamp-2 flex-grow">
            {description}
          </p>

          <div className="flex items-center mt-auto pt-3 border-t border-slate-100">
            <span className="text-xs font-medium text-amber-600">View course →</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;
