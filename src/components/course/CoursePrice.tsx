import { Newspaper, ShieldCheck, Video } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";

export interface EnrollProps {
  chapa_response: {
    message: string;
    status: string;
    data: {
      checkout_url: string;
    };
  };
}

const CoursePrice = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";
  const [data, setData] = useState<EnrollProps | null>(null);

  const enrollUser = async () => {
    if (!id) {
      console.error("Course ID is undefined");
      return;
    }

    try {
      const response = await fetch(`/api/course/${id}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to enroll user");
      }

      const responseData = await response.json();
      console.log(responseData, "data from enroll user");

      setData(responseData.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to enroll user";
      console.error(errorMessage);
    }
  };

  const handleButtonClick = () => {
    console.log("Button clicked!");
    if (id) {
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
              $49.99
            </span>
          </div>
        </div>
        <div className="px-6 pb-6">
          <button
            className="w-full mb-6 bg-purpleStandard hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            onClick={handleButtonClick}
          >
            Enroll Now
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
