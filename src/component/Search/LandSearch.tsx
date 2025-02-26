import React from "react";
import { Search } from "lucide-react";

const LandSearch = () => {
  return (
    <div className="flex justify-between border rounded-xl border-orangeStandard p-2 bg-white w-3/4">
      <input
        type="search"
        placeholder="Search any courses"
        className="focus:outline-none search-no-clear"
      />
      <div className="bg-orangeStandard p-2 text-white rounded-xl">
        <Search />
      </div>
    </div>
  );
};

export default LandSearch;
