import React from "react";
import type { mockCourse } from "@/utilities/mock";
import Image from "next/image";
import { CircleArrowRight, Star } from "lucide-react";

interface TemplateProps {
  topic: string;
  description: string;
  contents: typeof mockCourse;
}

const TemplateTopic = ({ topic, description, contents }: TemplateProps) => {
  const [firstWord, secondWord] = topic.split(" ");
  return (
    <div className="mt-12 align-middle">
      <div className="px-14">
        <h3 className="font-bold text-3xl">
          {firstWord} <span className="text-orangeStandard">{secondWord}</span>
        </h3>
        <p className="font-light text-lg w-96">{description}</p>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-14 py-5 mt-6 ${
          firstWord.toLowerCase() === "featured" ? "bg-[#F6F7F9]" : "bg-white"
        }`}
      >
        {(firstWord.toLowerCase() !== "featured"
          ? [...contents, ...contents]
          : contents
        ).map((content, index) => (
          <div key={index} className="rounded-3xl w-full bg-white pb-3">
            <Image
              src={content.image}
              alt={content.title}
              className="w-full object-cover rounded-lg"
              width={200}
              height={200}
            />

            <div className="mt-2 py-2 px-4">
              <h3 className="text-lg font-medium">{content.title}</h3>
              <h4 className="text-contentFontColor text-sm font-normal mt-1">
                Instructor:{" "}
                <span className="text-orangeStandard">
                  {content.instructor}
                </span>
              </h4>

              <p className="text-contentFontColor text-xs font-normal mt-2 leading-5 h-24">
                {content.description.split(" ").slice(0, 25).join(" ")} ...                
              </p>

              <div className="">
                <div className="flex gap-2">
                  <span className="text-orangeStandard font-bold">4.5</span>
                  <div className="flex gap-1">
                    <Star size={20} />
                    <Star size={20} />
                    <Star size={20} />
                    <Star size={20} />
                    <Star size={20} />
                  </div>
                </div>

                <p className="font-medium text-base mt-3">2000 Br.</p>
                <div className="text-right">
                  <button className="text-white px-2 py-1 font-semibold text-sm rounded-md bg-orangeStandard">
                    See more
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {topic !== "Featured Courses" && (
        <div className="flex justify-center align-middle">
          <button className="flex gap-2 text-white bg-orangeStandard rounded-xl px-3 py-2 mt-4 font-bold text-base items-center">
            View More
            <CircleArrowRight size={25} className="inline ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateTopic;
