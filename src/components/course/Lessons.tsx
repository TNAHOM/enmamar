import { useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { Lesson } from "@/types/courses";

const Lessons = ({ id }: { id: string }) => {
  console.log(id, "id from lesson component");
  const [activeDay, setActiveDay] = useState<number>(1);
  const {
    data: lessons,
    error,
    loading,
  } = useFetchData<Lesson[]>({
    url: `/api/lessons/${id}`, // Ensure id is used here
  });
  console.log(lessons, "lessons from lesson component");
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!lessons || error) {
    console.log(error, "error from lesson component");
    return <div>No data: {error}</div>;
  }

  return (
    <div className="p-3 border rounded-xl shadow-sm font-sans ">
      <div className="mb-2">
        <p className="text-2xl font-medium">Course Lessons</p>
        <p className="text-gray-500 font-normal text-lg">
          A comprehensive learning leasons
        </p>
      </div>
      <div className="space-y-3 overflow-hidden h-[600px] overflow-y-auto py-4">
        {lessons.map((item, index) => (
          <div
            key={item.id}
            className={` py-4 px-5 transition-colors duration-200 text-lg rounded-md font-medium cursor-pointer ${
              activeDay === index
                ? "text-purpleStandard bg-purple-200 border-gray-200 border "
                : "hover:bg-gray-100 "
            }`}
            onClick={() => setActiveDay(index)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  activeDay === index
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <span>
                <span className="font-medium">Lesson {index + 1}: </span>
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
