"use client";
import { useParams } from "next/navigation";
import { mockCourse } from "@/utilities/mock";
import Image from "next/image";
import CoursePrice from "@/components/course/CoursePrice";
import Lessons from "@/components/course/Lessons";
import CourseDescription from "@/components/course/CourseDescription";
import CourseReview from "@/components/course/CourseReview";
import { Star } from "lucide-react";

const CourseDetailPage = () => {
  const { id } = useParams() as { id: string };
  const course = mockCourse.find((_, index) => index.toString() === id);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="mx-16 my-10">
      <div className="grid grid-cols-10 gap-10">
        {/* Column 1 - Main Content */}
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
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
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
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Adding Course Description Component */}
          <CourseDescription
            description={course.description}
            level="Beginner to Intermediate"
            duration="42 hours"
            numLessons={3248}
            lastUpdated="March 2025"
          />

          {/* Adding Course Reviews Component */}
          <CourseReview averageRating={course.rating} totalReviews={128} />
        </div>

        {/* Column 2 - Sidebar */}
        <div className="col-span-3 space-y-5">
          <CoursePrice />
          <Lessons />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
