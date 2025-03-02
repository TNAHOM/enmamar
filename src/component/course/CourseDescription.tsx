import React from "react";
import { Clock, Users, CalendarDays } from "lucide-react";

interface CourseDescriptionProps {
  description: string;
  level: string;
  duration: string;
  numLessons: number;
  lastUpdated: string;
}

const CourseDescription = ({
  description,
  duration = "42 hours",
  numLessons = 5,
  lastUpdated = "December 2024",
}: CourseDescriptionProps) => {
  return (
    <div className="border rounded-xl shadow-sm font-sans overflow-hidden mb-8">
      <div className="space-y-6">
        <div className="bg-purple-50 p-6">
          <h3 className="font-medium text-2xl mb-4">Course Description</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-center gap-2">
              <Clock className="text-purpleStandard w-5 h-5" />
              <span className="text-gray-700">
                Duration: <span className="font-medium">{duration}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-purpleStandard w-5 h-5" />
              <span className="text-gray-700">
                Number of lessons:{" "}
                <span className="font-medium">
                  {numLessons.toLocaleString()}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="text-purpleStandard w-5 h-5" />
              <span className="text-gray-700">
                Last Updated: <span className="font-medium">{lastUpdated}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-4">
            <h3 className="font-semibold mb-2">About This Course</h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>

            <h3 className="font-semibold mt-6">{"What You'll Learn"}</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              <li>
                Master the fundamentals of programming with real-world examples
              </li>
              <li>
                Build complete applications using Java and C++ from scratch
              </li>
              <li>
                Understand object-oriented programming principles and best
                practices
              </li>
              <li>Implement data structures and algorithms efficiently</li>
              <li>Develop problem-solving skills through hands-on projects</li>
            </ul>

            <h3 className="font-semibold mt-6">Prerequisites</h3>
            <p className="text-gray-700">
              No prior programming experience needed. Basic computer skills and
              a desire to learn are all you need to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
