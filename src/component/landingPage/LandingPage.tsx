import Image from "next/image";
import React from "react";
import LandSearch from "../Search/LandSearch";

const LandingPage = () => {
  return (
    <div className="flex justify-between items-center bg-[#FCEDE6] px-20 py-6">
      <div className="">
        <h2 className="text-4xl font-bold">
          Unlock Your Potential with{" "}
          <span className="text-purpleStandard">Expert-Led</span> Courses
        </h2>
        <p className="text-2xl max-w-md my-4">
          Learn new skills anytime, anywhere at your own pace
        </p>
        <LandSearch />
      </div>
      <div className="">
        <Image
          src="/Images/landingPage-Image.png"
          width={500}
          height={500}
          alt="Landing Page Image"
        />
      </div>
    </div>
  );
};

export default LandingPage;
