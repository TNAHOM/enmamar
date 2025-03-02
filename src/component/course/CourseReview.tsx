import React from "react";
import Image from "next/image";
import { Star, ThumbsUp } from "lucide-react";

interface Review {
  id: number;
  username: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface CourseReviewsProps {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

const CourseReviews = ({
  averageRating = 4.5,
  totalReviews = 128,
  reviews = [],
}: CourseReviewsProps) => {
  const defaultReviews: Review[] = [
    {
      id: 1,
      username: "Sarah Johnson",
      rating: 5,
      date: "February 15, 2025",
      comment:
        "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. I started with zero programming knowledge and now I feel confident in both Java and C++.",
      helpful: 24,
    },
    {
      id: 2,
      username: "Michael Chen",
      rating: 4,
      date: "January 28, 2025",
      comment:
        "Great introduction to both languages. The parallel teaching approach helped me understand the differences and similarities. Would have liked more advanced topics toward the end.",
      helpful: 15,
    },
    {
      id: 3,
      username: "Amanuel Tesfaye",
      rating: 5,
      date: "March 1, 2025",
      comment:
        "The best programming course I've taken so far. Very comprehensive with excellent explanations and examples. The projects really helped solidify my understanding.",
      helpful: 32,
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="border rounded-xl shadow-sm font-sans overflow-hidden mt-8">
      <div className="space-y-6">
        <div className="bg-purple-50 p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-2xl">Student Reviews</h3>
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(averageRating)}</div>
              <span className="font-medium">{averageRating}</span>
              <span className="text-gray-500">({totalReviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="space-y-8">
            {displayReviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt={review.username}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{review.username}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-gray-500 text-sm">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 my-3">{review.comment}</p>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.helpful} people found this helpful</span>
                </div>
              </div>
            ))}

            <button className="w-full border border-purpleStandard text-purpleStandard hover:bg-purple-50 py-2 px-4 rounded-lg font-medium transition-colors">
              View All Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseReviews;
