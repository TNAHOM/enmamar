import { useEffect, useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { course as courseType } from "@/types/courses";
import { useLessonVideoStore } from "@/lib/store/lessonVideo-store";
import { Play } from "lucide-react";
import { toast } from "sonner";

const Lessons = ({ id }: { id: string }) => {
  const [activeDay, setActiveDay] = useState<number>(0);
  const { setActiveLesson, activeLesson, isLoading, error: errorLessonId, fetchEnrollStatus, isEnrolled } = useLessonVideoStore();
  const {
    data: course,
    error,
    loading,
  } = useFetchData<courseType>({
    url: `/api/course/${id}`,
  });
  const lessons = course?.lessons;

  useEffect(() => {
    fetchEnrollStatus(id);
  }, [id, fetchEnrollStatus]);

  const handleLessonClick = (lesson_id: string, index: number) => {
    setActiveDay(index);
    setActiveLesson(lesson_id, id);
    if (errorLessonId) {
      toast.error(errorLessonId);
      return;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!lessons || error) {
    console.log(error, "error from lesson component");
    return <div>No data: {error}</div>;
  }
  if (lessons.length === 0) {
    return <div>No lessons available</div>;
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
        {lessons.map((item, index) => {
          const disabledLesson = !isEnrolled && index !== 0;
          return (
            <div
              key={item.id}
              className={`py-4 px-5 transition-colors duration-200 text-lg rounded-md font-medium ${
                activeDay === index || activeLesson === item.id
                  ? "text-purpleStandard bg-purple-200 border-gray-200 border"
                  : disabledLesson
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
              onClick={disabledLesson ? undefined : () => handleLessonClick(item.id, index)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    activeDay === index ||
                    (activeLesson && activeLesson === item.id)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span>
                  <span className="font-medium">Lesson {index + 1}: </span>
                  {item.title}
                  {isLoading && activeLesson && (
                    <span className="ml-2 text-sm text-gray-500">
                      (Loading...)
                    </span>
                  )}
                </span>
                  <span>
                  <Play
                    className={
                    activeDay === index || (activeLesson && activeLesson === item.id)
                      ? "text-purple-600"
                      : "text-gray-400"
                    }
                    fill={
                    activeDay === index || (activeLesson && activeLesson === item.id)
                      ? "#7c3aed"
                      : "none"
                    }
                  />
                  </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lessons;
