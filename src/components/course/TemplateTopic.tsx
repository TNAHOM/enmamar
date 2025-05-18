"use client";

import CourseCard from "./CourseCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGetTopicCourses } from "@/hooks/useGetCourses";
import ShemmerEffect from "../course/ShemmerEffect";

interface TemplateProps {
  topic: string;
  description?: string;
}

const TemplateTopic = ({
  header,
  from,
}: {
  header: TemplateProps;
  from?: string;
}) => {
  const { topic, description } = header;
  const courseData = useGetTopicCourses(from ? { type: from } : {});

  const { data: contents, error, loading } = courseData;
  console.log(contents, "contents in TemplateTopic");
  const [firstWord, secondWord] = topic.split(" ");
  const isFeatured = firstWord.toLowerCase() === "featured";
  console.log(error, "error in TemplateTopic");

  if (error) {
    return <div>An error has occured: {error}</div>;
  }

  return (
    <div className="container space-y-8 mt-14">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {firstWord} <span className="text-purple-600">{secondWord}</span>
          </h2>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
        <Link
          href="#"
          className="text-sm font-medium text-purple-600 hover:underline flex items-center"
        >
          View all <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div
        className={`grid gap-6 sm:grid-cols-2 ${
          isFeatured ? "lg:grid-cols-3" : "lg:grid-cols-4"
        }`}
      >
        {!loading && (!contents || contents.length === 0) ? (
          <div className="col-span-full py-16 flex justify-center items-center text-lg font-medium">
            No courses available at the moment.
          </div>
        ) : (
          (!isFeatured ? contents : contents.slice(0, 3)).map((content) => (
            <CourseCard
              key={content.id}
              id={content.id}
              title={content.title}
              instructor={content.instructor.first_name}
              description={content.description}
              price={content.price}
              image={content.thumbnail_url}
              rating={4.5}
            />
          ))
        )}

        {loading && (
          <>
            {[...Array(4)].map((_, index) => (
              <ShemmerEffect key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateTopic;
