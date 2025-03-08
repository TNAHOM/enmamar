import { Home } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const ErrorTemplate = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-3xl font-bold text-purple-600 mb-2">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-6">
        {message ||
          "We apologize for the inconvenience. Please try again later."}
      </p>
      <Link href="/">
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
};
export default ErrorTemplate;
