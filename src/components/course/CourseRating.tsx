"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface CourseRatingProps {
  courseId: string;
}

export function CourseRating({
  courseId,
}: CourseRatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasRated, setHasRated] = useState<boolean>(false);

  const handleStarClick = async (selectedRating: number) => {
    if (selectedRating === rating && hasRated) return;

    setRating(selectedRating);
    setIsSubmitting(true);

    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 500));
      await fetch(`/api/rating/${courseId}`, {
        method: "POST",
        body: JSON.stringify({ rating: selectedRating }),
      });

      setHasRated(true);
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarHover = (hoveredRating: number) => {
    setHoverRating(hoveredRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating > 0 ? hoverRating : rating;

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center mb-1 gap-[2px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                  className="p-[2px] focus:outline-none transition-transform hover:scale-110"
                  aria-label={`Rate ${star} stars`}
                  disabled={isSubmitting}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= displayRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              <span className="font-medium text-purple-600">4.5</span> Rating
            </p>
          </div>
        </div>

        {hasRated && (
          <div className="mt-2">
            <p className="text-green-600 text-xs font-medium">
              Thank you for your rating!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
