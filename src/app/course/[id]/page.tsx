"use client";
import { useParams } from "next/navigation";
import { mockCourse } from "@/utilities/mock";
import Image from "next/image";
import CoursePrice from "@/component/course/CoursePrice";
import Lessons from "@/component/course/Lessons";
import { Star } from "lucide-react";

const CourseDetailPage = () => {
  const { id } = useParams();
  const course = mockCourse.find((_, index) => index.toString() === id);

  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <div className="mx-16">
      <div className="grid grid-cols-10 gap-10 mt-10">
        <div className="col-span-7 space-y-7">
          <h2 className="text-4xl font-bold leading-tight">{course.title}</h2>
          <p className="text-lg text-gray-500 font-normal">
            {course.description}
          </p>

          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="Instructor"
                width={50}
                height={50}
                className="rounded-full border-2 border-purple-100"
              />
              <div>
                <p className="text-base font-medium text-gray-500">
                  Instructor
                </p>
                <p className="text-lg font-medium">{course.instructor}</p>
              </div>
            </div>

            <div className="">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex gap-1">
                  <p className="text-base text-gray-500">Rating: </p>
                  <p className="font-medium">{course.rating}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[550px] border border-gray-300 rounded-xl overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover" // Ensures image covers container while maintaining aspect ratio
              priority={false}
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="col-span-3 space-y-5">
          <CoursePrice />
          <Lessons />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
