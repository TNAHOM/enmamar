import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

const LandSearch = () => {
  return (
    <div className="flex justify-between border rounded-xl border-purpleStandard p-2 bg-white w-3/4">
      <Input
        type="search"
        placeholder="Search any courses"
        className="focus:outline-none search-no-clear"
        disabled
      />
      <div className="bg-purpleStandard p-2 text-white rounded-xl">
        <Search />
      </div>
    </div>
  );
};

export default LandSearch;
