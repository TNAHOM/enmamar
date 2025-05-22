"use client";

import CourseCard from "./CourseCard";
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
  console.log("Contents:", courseData);
  const [firstWord, secondWord] = topic.split(" ");
  const isFeatured = firstWord.toLowerCase() === "featured";

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] px-4 text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Please refresh the page or try
          again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-5/6 sm:w-5/6 mx-auto px-4 lg:px-8 pb-8">
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {firstWord}{" "}
            <span className="text-purple-600 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {secondWord}
            </span>
          </h2>
          <p className="mt-2 text-gray-500 max-w-2xl">{description}</p>
        </div>
      </div>

      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-1 ${
          isFeatured
            ? "lg:grid-cols-2 xl:grid-cols-3"
            : "lg:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {!loading && (!contents || contents.length === 0) ? (
          <div className="col-span-full py-16 flex justify-center items-center text-lg font-medium bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-center">
              <p className="text-gray-500">
                No courses available at the moment.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Check back later for new content!
              </p>
            </div>
          </div>
        ) : (
          loading === false &&
          contents.length > 0 &&
          (!isFeatured ? contents : contents.slice(0, 3)).map((content) => (
            <CourseCard
              key={content.id}
              id={content.id}
              title={content.title}
              instructor={content.instructor.first_name}
              description={content.description}
              price={content.price}
              image={content.thumbnail_url || "/Images/thumbnail.webp"}
              rating={4.5}
            />
          ))
        )}

        {loading && (
          <>
            {[...Array(isFeatured ? 3 : 4)].map((_, index) => (
              <ShemmerEffect key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateTopic;
