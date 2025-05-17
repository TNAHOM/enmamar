import React, { useEffect, useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/auth-store";
import { Comment, CourseReviewsProps } from "@/types/comment";

const CourseReview = ({
  averageRating = 4.5,
  totalReviews = 128,
  courseId,
}: CourseReviewsProps) => {
  const { user } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [commentFocused, setCommentFocused] = useState(false);

  useEffect(() => {
    const id = courseId;
    const fetchComment = async () => {
      try {
        const res = await fetch(`/api/comment/${id}`);
        if (!res.ok) {
          toast.error("Failed to load comments");
          setComments([]);
          return;
        }
        const body = await res.json();

        setComments(body.data.comments);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load comments";
        setComments([]);
        toast.error(errorMessage);
      }
    };
    fetchComment();
  }, [courseId]);

  const postComment = async () => {
    if (!comment.trim()) {
      throw new Error("Comment cannot be empty");
    }
    const id = courseId;

    const res = await fetch(`/api/comment/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: courseId,
        content: comment,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to post comment");
    }

    const { data } = await res.json();
    const newComment = {
      content: comment,
      user_id: user?.id || "",
      course_id: courseId,
      created_at: new Date().toISOString(),
      updated_at: null,
    };

    setComments((prevComments) => [newComment, ...prevComments]);
    setComment(""); // Clear input after successful post
    toast.success("Comment posted successfully");

    console.log(newComment, "data.comment from course review component");
    return data.comment;
  };

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

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    postComment();
    setComment("");
    setCommentFocused(false);
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

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Comments</h2>
            <div className="flex items-center text-sm">
              <span className="font-medium mr-2">{totalReviews} comments</span>
              <div className="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-gray-900">
                <span>Sort by</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Comment Input */}
          <div className="flex gap-3 mb-8">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Your avatar"
              />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <form onSubmit={handleSubmitComment}>
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onFocus={() => setCommentFocused(true)}
                  className="min-h-[40px] resize-none border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-900"
                />
                {commentFocused && (
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCommentFocused(false);
                        setComment("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={!comment.trim()}
                    >
                      Comment
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments &&
              comments.map((c, index) => (
                <div key={index} className="mb-6">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={"/placeholder.svg"}
                        alt={"comment.user.name"}
                      />
                      <AvatarFallback>{"comment.user.initials"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{c.user_id}</span>
                        <span className="text-gray-500 text-sm">
                          {c.created_at}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-800">{c.content}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
