import { Newspaper, ShieldCheck, Video } from "lucide-react";

const CoursePrice = () => {
  // const features = [
  //   "42 hours on-demand video",
  //   "25 downloadable resources",
  //   "Certificate of completion",
  // ];

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
          <button className="w-full mb-6 bg-purpleStandard hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
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
