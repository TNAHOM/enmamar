import { useEffect, useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { course as courseType } from "@/types/courses";
import { useLessonVideoStore } from "@/lib/store/lessonVideo-store";
import { Play, Lock, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const Lessons = ({ id, start }: { id: string; start: boolean }) => {
  const [activeDay, setActiveDay] = useState<number>(0);
  const {
    setActiveLesson,
    activeLesson,
    isLoading,
    error: errorLessonId,
    fetchEnrollStatus,
    isEnrolled,
  } = useLessonVideoStore();
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

  useEffect(() => {
    if (start && lessons && lessons.length > 0) {
      setActiveLesson(lessons[0].id, id);
      setActiveDay(0);
    }
  }, [start, lessons, setActiveLesson, id]);

  const handleLessonClick = (lesson_id: string, index: number) => {
    setActiveDay(index);
    setActiveLesson(lesson_id, id);
    if (errorLessonId) {
      toast.error(errorLessonId);
      return;
    }
  };

  if (loading) {
    return (
      <div className="p-6 border rounded-xl shadow-sm bg-white animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-full mb-6"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg mb-3"></div>
        ))}
      </div>
    );
  }

  if (!lessons || error) {
    console.log(error, "error from lesson component");
    return (
      <div className="p-6 border rounded-xl shadow-sm bg-white text-center">
        <div className="text-red-500 font-medium mb-2">
          Unable to load lessons
        </div>
        <div className="text-gray-500 text-sm">Error: {error}</div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="p-6 border rounded-xl shadow-sm bg-white text-center">
        <div className="text-gray-500 font-medium">
          No lessons available for this course yet
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-xl shadow-sm bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6">
        <h3 className="text-2xl font-semibold text-gray-800">Course Lessons</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-gray-600 font-normal">
            {lessons.length} comprehensive lessons
          </p>
          <div className="text-sm text-purple-700 bg-purple-100 px-3 py-1 rounded-full font-medium">
            {Math.floor(lessons.length * 0.3)} hours of content
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 pt-4">
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-purple-700 h-full rounded-full"
            style={{
              width: `${(((activeDay + 1) / lessons.length) * 100).toFixed(
                0
              )}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>
            {(((activeDay + 1) / lessons.length) * 100).toFixed(0)}% complete
          </span>
          <span>
            {activeDay + 1}/{lessons.length} lessons
          </span>
        </div>
      </div>

      {/* Lessons list */}
      <div className="p-4">
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {lessons.map((item, index) => {
            const disabledLesson = !isEnrolled && index !== 0;
            const isActive = activeDay === index || activeLesson === item.id;
            const isCompleted = index < activeDay;

            return (
              <div
                key={item.id}
                className={`relative group rounded-xl transition-all duration-200 overflow-hidden border ${
                  isActive
                    ? "border-purple-400 bg-purple-50"
                    : isCompleted
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 hover:border-purple-200"
                } ${disabledLesson ? "opacity-70" : ""}`}
              >
                <div
                  className={`py-4 px-5 ${
                    disabledLesson ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={
                    disabledLesson
                      ? undefined
                      : () => handleLessonClick(item.id, index)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-medium">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 font-medium">
                          Lesson {index + 1}
                        </span>
                        <span className="font-medium text-gray-800 line-clamp-1">
                          {item.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {5 + index} min
                      </span>
                      {disabledLesson ? (
                        <Lock className="w-5 h-5 text-gray-400" />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isActive
                              ? "bg-purple-600"
                              : "bg-gray-200 group-hover:bg-purple-200"
                          }`}
                        >
                          <Play
                            className={`w-4 h-4 ${
                              isActive ? "text-white" : "text-gray-700"
                            }`}
                            fill={isActive ? "white" : "none"}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {isLoading && activeLesson === item.id && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"></div>
                      <span className="text-sm text-purple-700">
                        Loading lesson...
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600"></div>
                )}
                {isCompleted && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      {!isEnrolled && (
        <div className="bg-amber-50 p-4 border-t border-amber-200">
          <div className="flex items-center gap-2 text-amber-700">
            <Lock className="w-4 h-4" />
            <p className="text-sm font-medium">
              Enroll in this course to unlock all lessons
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;
