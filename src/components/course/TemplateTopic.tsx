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

  const [firstWord, secondWord] = topic.split(" ");
  const isFeatured = firstWord.toLowerCase() === "featured";

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] px-4 text-center">
        <h1 className="font-heading text-3xl font-bold text-slate-700 mb-2">
          Something went wrong
        </h1>
        <p className="text-slate-500 mb-6">
          We apologize for the inconvenience. Please refresh the page or try
          again later.
        </p>
      </div>
    );
  }

  const displayContents = isFeatured ? (contents || []).slice(0, 3) : (contents || []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 pb-12">
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl text-slate-800">
            {firstWord}{" "}
            <span className="text-amber-600">{secondWord}</span>
          </h2>
          <p className="mt-2 text-slate-500 max-w-2xl">{description}</p>
        </div>
      </div>

      <div className="grid gap-6 md:gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        {!loading && (!contents || contents.length === 0) ? (
          <div className="col-span-full py-16 flex justify-center items-center text-lg font-medium bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-center">
              <p className="text-slate-500">No courses available at the moment.</p>
              <p className="text-sm text-slate-400 mt-2">Check back later for new content!</p>
            </div>
          </div>
        ) : (
          loading === false &&
          displayContents.length > 0 &&
          displayContents.map((content: { id: string; title: string; instructor: { first_name: string }; description: string; price: number; thumbnail_url?: string }) => (
            <div key={content.id}>
              <CourseCard
                id={content.id}
                title={content.title}
                instructor={content.instructor.first_name}
                description={content.description}
                price={content.price}
                image={content.thumbnail_url || "/Images/thumbnail.webp"}
                rating={4.5}
              />
            </div>
          ))
        )}

        {loading && (
          <>
            {[...Array(8)].map((_, index) => (
              <ShemmerEffect key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateTopic;
