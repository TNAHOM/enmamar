import React, { useEffect, useState } from "react";
import { ShieldCheck, Video, FileText, Clock, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLessonVideoStore } from "@/lib/store/lessonVideo-store";
import { toast } from "sonner";

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
  discount,
}: {
  courseId: string;
  price: number;
  discount: number;
}) => {
  // Calculate discounted price
  const discountedPrice = price - (price * discount) / 100;
  const { isEnrolled, enrollLoading, fetchEnrollStatus } =
    useLessonVideoStore();
  console.log(isEnrolled, "isEnrolled");
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
    <div className="border rounded-xl shadow-sm overflow-hidden bg-white">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-5 text-white">
        <h3 className="text-xl font-semibold">Course Fee</h3>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {discount > 0 && (
            <span className="text-gray-400 line-through text-lg">
              {price.toFixed(2)} Br.
            </span>
          )}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-purple-700">
              {discountedPrice.toFixed(2)} Br.
            </span>
            {discount > 0 && (
              <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>

        <button
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-6${
            isEnrolled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purpleStandard hover:bg-purple-700"
          }`}
          onClick={handleButtonClick}
          disabled={isEnrolled || enrollLoading}
        >
          <ShieldCheck className="w-5 h-5" />
          {isEnrolled
            ? "Enrolled"
            : enrollLoading
            ? "loading"
            : "Enroll Now"}
        </button>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">This course includes:</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Video className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  42 hours on-demand video
                </p>
                <p className="text-sm text-gray-500">Watch anytime, anywhere</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  25 downloadable resources
                </p>
                <p className="text-sm text-gray-500">
                  PDFs, code samples, and more
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  Full lifetime access
                </p>
                <p className="text-sm text-gray-500">Learn at your own pace</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  Certificate of completion
                </p>
                <p className="text-sm text-gray-500">Boost your resume</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePrice;
