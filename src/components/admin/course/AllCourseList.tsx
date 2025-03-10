"use client";

import CourseCard from "@/components/CourseCard";
import { useGetCourses } from "@/hooks/useGetCourses";
import React from "react";
import { course } from "@/types/courses";

const AllCoursesList = () => {
  const { data, error, loading } = useGetCourses();
  console.log(error, "error from all courses list");
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container space-y-8 mt-14">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            List of All Courses
          </h2>
          <p className="mt-2 text-muted-foreground">
            This is the description part
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((content: course) => (
          <CourseCard
            key={content.id}
            id={content.id}
            title={content.title}
            instructor={
              content.instructor.first_name + " " + content.instructor.last_name
            }
            description={content.description}
            price={content.price}
            image={content.image}
            rating={content.rating || 4.5}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCoursesList;
