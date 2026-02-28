import { useEffect, useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { course as courseType } from "@/types/courses";
import { useLessonVideoStore } from "@/lib/store/lessonVideo-store";
import { Play, Lock, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/auth-store";

const Lessons = ({ id, start }: { id: string; start: boolean }) => {
  const { user } = useAuthStore();
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
    if (!user && index !== 0) {
      toast.error("Please log in to access lessons");
    } else {
      setActiveDay(index);
      setActiveLesson(lesson_id, id);

      if (errorLessonId) {
        toast.error(errorLessonId);
        return;
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 border border-slate-200 rounded-xl shadow-sm bg-white animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-2/3 mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-full mb-6"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-lg mb-3"></div>
        ))}
      </div>
    );
  }

  if (!lessons || error) {
    return (
      <div className="p-6 border border-slate-200 rounded-xl shadow-sm bg-white text-center">
        <div className="text-red-500 font-medium mb-2">
          Unable to load lessons
        </div>
        <div className="text-slate-500 text-sm">Error: {error}</div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="p-6 border border-slate-200 rounded-xl shadow-sm bg-white text-center">
        <div className="text-slate-500 font-medium">
          No lessons available for this course yet
        </div>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 p-6">
        <h3 className="font-heading text-2xl font-semibold text-slate-800">Course Lessons</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-slate-600 font-normal">
            {lessons.length} comprehensive lessons
          </p>
          <div className="text-sm text-amber-800 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full font-medium">
            {Math.floor(lessons.length * 0.3)} hours of content
          </div>
        </div>
      </div>

      <div className="px-6 pt-4">
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-300"
            style={{
              width: `${(((activeDay + 1) / lessons.length) * 100).toFixed(0)}%`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>
            {(((activeDay + 1) / lessons.length) * 100).toFixed(0)}% complete
          </span>
          <span>
            {activeDay + 1}/{lessons.length} lessons
          </span>
        </div>
      </div>

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
                    ? "border-amber-300 bg-amber-50/80"
                    : isCompleted
                    ? "border-emerald-200 bg-emerald-50/80"
                    : "border-slate-200 hover:border-amber-200"
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
                            ? "bg-amber-500 text-slate-900"
                            : isCompleted
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-700"
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
                        <span className="text-sm text-slate-500 font-medium">
                          Lesson {index + 1}
                        </span>
                        <span className="font-medium text-slate-800 line-clamp-1">
                          {item.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {5 + index} min
                      </span>
                      {disabledLesson ? (
                        <Lock className="w-5 h-5 text-slate-400" />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isActive
                              ? "bg-amber-500"
                              : "bg-slate-200 group-hover:bg-amber-100"
                          }`}
                        >
                          <Play
                            className={`w-4 h-4 ${
                              isActive ? "text-slate-900" : "text-slate-700"
                            }`}
                            fill={isActive ? "currentColor" : "none"}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {isLoading && activeLesson === item.id && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-sm text-amber-700">
                        Loading lesson...
                      </span>
                    </div>
                  )}
                </div>

                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-r" />
                )}
                {isCompleted && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!isEnrolled && (
        <div className="bg-amber-50 p-4 border-t border-amber-200">
          <div className="flex items-center gap-2 text-amber-800">
            <Lock className="w-4 h-4 flex-shrink-0" />
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
