import { Newspaper, ShieldCheck, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useLessonVideoStore } from "@/lib/store/lessonVideo-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface EnrollProps {
  chapa_response: {
    message: string;
    status: string;
    data: {
      checkout_url: string;
    };
  };
}

const CoursePrice = ({
  courseId: id,
  price,
}: {
  courseId: string;
  price: number;
}) => {
  const { isEnrolled, enrollLoading, fetchEnrollStatus } =
    useLessonVideoStore();
  const [data, setData] = useState<EnrollProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchEnrollStatus(id);
  }, [id, fetchEnrollStatus]);

  const enrollUser = async () => {
    if (!id) {
      console.error("Course ID is undefined");
      return;
    }

    try {
      const response = await fetch(`/api/course/${id}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();

      if (responseData.status === 401) {
        toast.info("Please sign up to enroll in the course.");
        router.push("/auth/login");
        return;
      }
      if (!response.ok) {
        toast.error("Failed to enroll user");
      }

      setData(responseData.data);
      // refresh enrollment status
      fetchEnrollStatus(id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to enroll user";
      console.log(errorMessage);
    }
  };

  const handleButtonClick = () => {
    if (!isEnrolled) {
      enrollUser();
    }
    if (data?.chapa_response.data.checkout_url) {
      window.open(data.chapa_response.data.checkout_url, "_blank");
    }
  };

  return (
    <div className="border rounded-xl shadow-sm font-sans overflow-hidden">
      <div className="space-y-6 ">
        <div className="space-y-2 bg-purple-50 p-6">
          <div className="flex items-baseline gap-2 justify-between">
            <h3 className="font-medium text-2xl">Course Price:</h3>
            <span className="border bg-purpleStandard px-3 py-1 rounded-3xl text-white text-lg font-semibold">
              {price} Br.
            </span>
          </div>
        </div>
        <div className="px-6 pb-6">
          <button
            className={`w-full mb-6 py-3 px-4 rounded-lg font-medium transition-colors text-white ${
              isEnrolled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purpleStandard hover:bg-purple-700"
            }`}
            onClick={handleButtonClick}
            disabled={isEnrolled || enrollLoading}
          >
            {isEnrolled
              ? "Enrolled"
              : enrollLoading
              ? "Enrolling..."
              : "Enroll Now"}
          </button>

          <div className="space-y-3">
            <h3 className="font-semibold mb-2">This course includes:</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <Video className="w-6 h-6 text-purpleStandard" />
                <span className="text-gray-700">42 hours on-demand video</span>
              </li>
              <li className="flex gap-2">
                <Newspaper className="w-6 h-6 text-purpleStandard" />
                <span className="text-gray-700">25 downloadable resources</span>
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="w-6 h-6 text-purpleStandard" />
                <span className="text-gray-700">Certificate of completion</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePrice;
