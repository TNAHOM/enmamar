import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 px-14">
      <div className="text-xl  text-orangeStandard font-bold">
        ENMAMAR
      </div>
      <div className="flex justify-between items-center space-x-8 font-medium">
        <p>Explore</p>
        <p>Become an Instructor</p>
        <a
          className="text-orangeStandard border border-orangeStandard px-4 py-1"
          href=""
        >
          Login
        </a>
        <a href="" className="px-4 py-1 bg-orangeStandard text-white">
          SignUp
        </a>
      </div>
    </div>
  );
};

export default Navbar;
