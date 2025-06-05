import Image from "next/image";
import React from "react";
import { ArrowRight, BookOpen, Users, Award, Clock } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  const stats = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      value: "10+",
      label: "Courses",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "50+",
      label: "Students",
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "20+",
      label: "Instructors",
    },
    { icon: <Clock className="w-6 h-6" />, value: "24/7", label: "Access" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purpleStandard to-purple-900 text-white">
      {/* Decorative elements */}
      <div className="absolute top-10 sm:top-16 md:top-20 left-5 sm:left-8 md:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-purple-500 mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-5 sm:bottom-8 md:bottom-10 right-5 sm:right-8 md:right-10 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full bg-indigo-600 mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12 md:py-16">
        <div className="w-full lg:w-1/2 mb-8 sm:mb-10 md:mb-12 lg:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            Transform Your Future With Expert-Led Courses
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-lg mb-6 sm:mb-8 opacity-90">
            Learn, grow, and master in-demand skills at your own pace with
            personalized learning paths.
          </p>

          {/* <div className="mb-6 sm:mb-8 md:mb-10">
            <LandSearch />
          </div> */}

          <div className="flex flex-wrap gap-3 mb-6 sm:mb-8 md:mb-10">
            <Link href="/become-instructor">
              <button className="bg-white text-purple-800 hover:bg-gray-100 transition-colors px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center gap-2 text-sm sm:text-base">
                Become an Instructor{" "}
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </Link>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-1 sm:mb-2">
                  {stat.icon}
                </div>
                <p className="font-bold text-xl sm:text-2xl">{stat.value}</p>
                <p className="text-xs sm:text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <div className="relative">
            {/* Main image */}
            <div className="relative z-10">
              <Image
                src="/Images/landingPage-Image.png"
                width={550}
                height={550}
                alt="Student learning online"
                className="rounded-2xl w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-full lg:h-full xl:w-550 xl:h-550 object-cover"
              />
            </div>

            {/* Floating cards */}
            <div className="absolute -top-3 sm:-top-4 md:-top-6 -left-3 sm:-left-4 md:-left-6 bg-white text-purple-900 p-2 sm:p-3 md:p-4 rounded-lg shadow-lg transform rotate-6 z-20">
              <div className="flex gap-1 sm:gap-2 items-center">
                <div className="bg-green-500 rounded-full w-2 h-2 sm:w-3 sm:h-3"></div>
                <p className="font-medium text-xs sm:text-sm">
                  Live Classes Available
                </p>
              </div>
            </div>

            <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -right-2 sm:-right-3 md:-right-4 bg-white text-purple-900 p-2 sm:p-3 md:p-4 rounded-lg shadow-lg transform -rotate-3 z-20">
              <div className="flex gap-1 sm:gap-2 items-center">
                <div className="bg-yellow-500 rounded-full w-2 h-2 sm:w-3 sm:h-3"></div>
                <p className="font-medium text-xs sm:text-sm">
                  Certificate Included
                </p>
              </div>
            </div>

            <div className="absolute bottom-1/3 -right-6 sm:-right-8 md:-right-12 bg-gradient-to-r from-purple-600 to-purple-800 p-2 sm:p-3 rounded-full shadow-lg pulse-animation z-20">
              <p className="font-medium text-xs sm:text-sm whitespace-nowrap">
                30% OFF First Course
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
