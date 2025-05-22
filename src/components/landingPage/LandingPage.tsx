import Image from "next/image";
import React from "react";
import LandSearch from "../Search/LandSearch";
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
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500 mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-600 mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-16">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Transform Your Future With Expert-Led Courses
          </h1>
          <p className="text-lg md:text-2xl font-light max-w-lg mb-8 opacity-90">
            Learn, grow, and master in-demand skills at your own pace with
            personalized learning paths.
          </p>

          <div className="mb-10">
            <LandSearch />
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/become-instructor">
              <button className="bg-white text-purple-800 hover:bg-gray-100 transition-colors px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                Become an Instructor <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            {/* <button className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors px-6 py-3 rounded-lg font-medium">
              Become an Instructor
            </button> */}
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <p className="font-bold text-2xl">{stat.value}</p>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            {/* Main image */}
            <div className="relative z-10">
              <Image
                src="/Images/landingPage-Image.png"
                width={550}
                height={550}
                alt="Student learning online"
                className="rounded-2xl"
              />
            </div>

            {/* Floating cards */}
            <div className="absolute -top-6 -left-6 bg-white text-purple-900 p-4 rounded-lg shadow-lg transform rotate-6 z-20">
              <div className="flex gap-2 items-center">
                <div className="bg-green-500 rounded-full w-3 h-3"></div>
                <p className="font-medium text-sm">Live Classes Available</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white text-purple-900 p-4 rounded-lg shadow-lg transform -rotate-3 z-20">
              <div className="flex gap-2 items-center">
                <div className="bg-yellow-500 rounded-full w-3 h-3"></div>
                <p className="font-medium text-sm">Certificate Included</p>
              </div>
            </div>

            <div className="absolute bottom-1/3 -right-12 bg-gradient-to-r from-purple-600 to-purple-800 p-3 rounded-full shadow-lg pulse-animation z-20">
              <p className="font-medium text-sm">30% OFF First Course</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
