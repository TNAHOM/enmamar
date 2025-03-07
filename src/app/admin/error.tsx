"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-3xl font-bold text-purple-600 mb-2">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-6">
        {/* {error.message || "An unexpected error occurred."} */}
        We apologize for the inconvenience. Please try again later.
      </p>
      <Link href="/">
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
