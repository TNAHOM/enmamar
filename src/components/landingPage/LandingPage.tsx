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
    <div className="relative overflow-hidden bg-[hsl(215,28%,12%)] text-white">
      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Soft gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-600/5 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12 md:py-16">
        <div className="w-full lg:w-1/2 mb-8 sm:mb-10 md:mb-12 lg:mb-0">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6 tracking-tight">
            Transform Your Future With Expert-Led Courses
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-lg mb-6 sm:mb-8 text-slate-300">
            Learn, grow, and master in-demand skills at your own pace with
            personalized learning paths.
          </p>

          <div className="flex flex-wrap gap-3 mb-6 sm:mb-8 md:mb-10">
            <Link href="/become-instructor">
              <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 text-sm sm:text-base transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/20">
                Become an Instructor{" "}
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transition-transform duration-200 hover:scale-105"
              >
                <div className="flex justify-center mb-1 sm:mb-2 text-amber-400">
                  {stat.icon}
                </div>
                <p className="font-heading font-bold text-xl sm:text-2xl">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/Images/landingPage-Image.png"
                priority
                width={550}
                height={550}
                alt="Student learning online"
                className="rounded-2xl w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-full lg:h-full xl:w-[550px] xl:h-[550px] object-cover"
              />
            </div>

            <div className="absolute -top-3 sm:-top-4 md:-top-6 -left-3 sm:-left-4 md:-left-6 bg-white text-slate-900 p-2 sm:p-3 md:p-4 rounded-lg shadow-xl transform rotate-3 z-20 border border-slate-100">
              <div className="flex gap-1 sm:gap-2 items-center">
                <div className="bg-emerald-500 rounded-full w-2 h-2 sm:w-3 sm:h-3 animate-pulse" />
                <p className="font-medium text-xs sm:text-sm">
                  Live Classes Available
                </p>
              </div>
            </div>

            <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -right-2 sm:-right-3 md:-right-4 bg-white text-slate-900 p-2 sm:p-3 md:p-4 rounded-lg shadow-xl transform -rotate-3 z-20 border border-slate-100">
              <div className="flex gap-1 sm:gap-2 items-center">
                <div className="bg-amber-500 rounded-full w-2 h-2 sm:w-3 sm:h-3" />
                <p className="font-medium text-xs sm:text-sm">
                  Certificate Included
                </p>
              </div>
            </div>

            <div className="absolute bottom-1/3 -right-6 sm:-right-8 md:-right-12 bg-amber-500 text-slate-900 px-3 py-2 sm:py-3 rounded-full shadow-lg z-20 font-semibold text-xs sm:text-sm whitespace-nowrap">
              30% OFF First Course
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
