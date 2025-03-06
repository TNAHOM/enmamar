import React from "react";
import type { mockCourse } from "@/utilities/mock";
import CourseCard from "./CourseCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface TemplateProps {
  topic: string;
  description: string;
  contents: typeof mockCourse;
}

const TemplateTopic = ({ topic, description, contents }: TemplateProps) => {
  const [firstWord, secondWord] = topic.split(" ");
  const isFeatured = firstWord.toLowerCase() === "featured";
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
        {(!isFeatured ? [...contents, ...contents] : contents.slice(0, 3)).map(
          (content, index) => (
            <CourseCard
              key={index}
              id={index}
              title={content.title}
              instructor={content.instructor}
              description={content.description}
              price={content.price}
              image={content.image}
              rating={content.rating || 4.5}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TemplateTopic;
