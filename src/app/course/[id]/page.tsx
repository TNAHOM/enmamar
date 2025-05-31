"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import CoursePrice from "@/components/course/CoursePrice";
import Lessons from "@/components/course/Lessons";
import CourseReview from "@/components/course/CourseReview";
import { useFetchData } from "@/hooks/useFetchData";
import { course as courseType } from "@/types/courses";
import { useLessonVideoStore } from "@/lib/store/lessonVideo-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Calendar, ChevronRight, Play, Trophy } from "lucide-react";
import Link from "next/link";

const CourseDetailPage = () => {
  const { id } = useParams() as { id: string };
  const [start, setStart] = useState<boolean>(false);
  const {
    activeLesson,
    isVideoPlaying,
    videoUrl,
    isLoading,
    error: videoError,
    resetVideoState,
  } = useLessonVideoStore();

  const {
    data: course,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
    loading,
  } = useFetchData<courseType>({
    url: `/api/course/${id}`,
  });

  useEffect(() => {
    return () => {
      resetVideoState();
    };
  }, [id, resetVideoState]);

  if (!id || loading) {
    return (
      <div className="mx-auto my-6 md:my-10 px-4 w-full lg:w-5/6 animate-pulse">
        <div className="h-10 md:h-12 bg-gray-200 rounded w-full md:w-1/2 mb-4 md:mb-6"></div>
        <div className="h-6 md:h-8 bg-gray-200 rounded w-1/3 md:w-1/4 mb-3 md:mb-4"></div>
        <div className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-gray-200 rounded-xl mb-4 md:mb-6"></div>
        <div className="h-20 md:h-24 bg-gray-200 rounded mb-4 md:mb-6"></div>
        <div className="h-48 md:h-64 bg-gray-200 rounded mb-4 md:mb-6"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="mx-auto my-10 md:my-20 w-full px-4 md:w-4/5 lg:w-3/4 text-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 md:p-12">
          <h2 className="text-xl md:text-2xl font-semibold text-red-700 mb-3 md:mb-4">
            Course Not Found
          </h2>
          <p className="text-red-600 mb-4 md:mb-6">
            {
              "We couldn't find the course you were looking for. It may have been removed or the URL might be incorrect."
            }
          </p>
          <button className="px-4 py-2 md:px-6 md:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Browse All Courses
          </button>
        </div>
      </div>
    );
  }
  console.log(course.instructor, "Instructor data");
  if (videoError) {
    toast.error(videoError);
  }
  return (
    <div className="mx-auto my-6 md:my-10 w-full px-4 lg:w-5/6">
      {/* Course breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-3 md:mb-4 overflow-x-auto whitespace-nowrap pb-1">
        <Link href="/" className="hover:text-purple-600 flex-shrink-0">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
        <a href="/courses" className="hover:text-purple-600 flex-shrink-0">
          Courses
        </a>
        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
        <span className="text-gray-700 font-medium truncate">
          {course.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-10">
        {/* Top section for mobile - Course pricing */}
        <div className="lg:hidden">
          <CoursePrice
            courseId={id}
            price={course.price}
            discount={course.discount}
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          {/* Course title */}
          <div className="bg-gradient-to-r from-purple-50 to-white p-4 md:p-6 rounded-xl border border-purple-100">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-800 mb-3 md:mb-4">
              {course.title}
            </h1>

            <div className="flex flex-wrap gap-2 md:gap-4 items-center mb-3 md:mb-4">
              <div className="bg-blue-100 px-2 py-1 rounded-full text-blue-700 text-xs md:text-sm font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                <span>Last updated: May 2025</span>
              </div>
            </div>

            {/* Instructor info */}
            <div className="flex items-center gap-3 mt-4 md:mt-6">
              <Image
                src={
                  course.instructor.profile_picture || "/Images/Full-stack.png"
                }
                alt={`Instructor ${course.instructor.first_name}`}
                width={50}
                height={50}
                className="rounded-full border-2 border-purple-200 w-10 h-10 md:w-[60px] md:h-[60px]"
              />
              <Link
                href={`/instructor/${course.instructor.id}`}
                className="cursor-pointer hover:underline"
              >
                <div>
                  <p className="text-gray-500 text-xs md:text-sm">Instructor</p>
                  <p className="text-base md:text-lg font-semibold text-gray-800">
                    {course.instructor.first_name +
                      " " +
                      course.instructor.last_name}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-amber-500" />
                    <span>Top-rated instructor</span>
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Video player */}
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-gray-900">
            {isLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-gray-400 border-t-purple-600 animate-spin mb-3 md:mb-4"></div>
                <p className="text-sm md:text-base text-gray-300">
                  Loading video...
                </p>
              </div>
            ) : videoError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-red-900/10">
                <div className="bg-red-100 text-red-700 p-3 md:p-4 rounded-lg max-w-xs md:max-w-md text-center mx-4">
                  <p className="font-medium mb-1 md:mb-2 text-sm md:text-base">
                    Error loading video
                  </p>
                  <p className="text-xs md:text-sm">{videoError}</p>
                </div>
              </div>
            ) : activeLesson && isVideoPlaying && videoUrl ? (
              <iframe
                src={videoUrl}
                width="100%"
                height="100%"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="border-none"
              />
            ) : (
              <div
                className="relative w-full h-full group cursor-pointer"
                onClick={() => setStart(true)}
              >
                <Image
                  src="/Images/thumbnail.webp"
                  alt={course.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  className="object-cover brightness-75"
                  priority={false}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 md:w-8 md:h-8 text-white fill-white ml-0.5 md:ml-1" />
                    </div>
                  </div>
                </div>
                {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-6">
                  <h3 className="text-white text-base md:text-xl font-medium">
                    Course Preview
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm flex items-center gap-1 md:gap-2">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    <span>5:23 minutes</span>
                  </p>
                </div> */}
              </div>
            )}
          </div>

          {/* Course description */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
              About This Course
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Mobile view - Lessons section */}
          <div className="lg:hidden">
            <Lessons id={id} start={start} />
          </div>

          {/* Reviews */}
          <CourseReview courseId={id} />
        </div>

        {/* Desktop right sidebar */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <CoursePrice
            courseId={id}
            price={course.price}
            discount={course.discount}
          />
          <Lessons id={id} start={start} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
