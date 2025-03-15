"use client";
import { Button } from "@/components/ui/button";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We apologize for the inconvenience. Please try again later.
          </p>
          <p>{error.message}</p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </body>
    </html>
  );
}
