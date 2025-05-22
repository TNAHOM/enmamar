import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/auth-store";
import { Comment, CourseReviewsProps } from "@/types/comment";
import {
  MessageSquare,
  Send,
  ThumbsUp,
  Clock,
  AlertCircle,
} from "lucide-react";

const CourseReview = ({ courseId }: CourseReviewsProps) => {
  const { user } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [commentFocused, setCommentFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

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

    setIsSubmitting(true);
    const id = courseId;

    try {
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

      return data.comment;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to post comment";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    postComment();
    setComment("");
    setCommentFocused(false);
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return dateString;
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = (userId: string) => {
    if (!userId) return "U";
    return userId.substring(0, 2).toUpperCase();
  };

  // Display comments with limit for non-expanded view
  const visibleComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="border rounded-xl shadow-sm font-sans overflow-hidden mt-6 md:mt-8 bg-white">
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-4 md:px-6 md:py-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-3">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
              <h3 className="font-medium text-xl md:text-2xl">
                Student Reviews
              </h3>
            </div>
            <div className="flex items-center gap-1 md:gap-2 bg-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm">
              <span className="font-medium">{comments.length}</span>
              <span>Comments</span>
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="px-4 py-3 md:px-6 md:py-4">
          <div className="flex gap-2 md:gap-3 mb-6 md:mb-8">
            <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-purple-100">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Your avatar"
              />
              <AvatarFallback className="bg-purple-100 text-purple-700 font-medium text-sm md:text-base">
                {user ? getUserInitials(user.id) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <form onSubmit={handleSubmitComment}>
                <Textarea
                  placeholder={
                    user
                      ? "Share your thoughts about this course..."
                      : "Login to comment"
                  }
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onFocus={() => setCommentFocused(true)}
                  className={`min-h-[60px] md:min-h-[80px] text-sm md:text-base resize-none rounded-lg border-gray-200 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 ${
                    !user && "opacity-60 cursor-not-allowed"
                  }`}
                  disabled={!user}
                />

                {commentFocused && (
                  <div className="flex justify-end gap-2 mt-2 md:mt-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCommentFocused(false);
                        setComment("");
                      }}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xs md:text-sm py-1 px-2 md:py-2 md:px-3"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm py-1 px-2 md:py-2 md:px-3"
                      disabled={!comment.trim() || isSubmitting}
                    >
                      {isSubmitting ? "Posting..." : "Post Comment"}
                      <Send className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </div>
                )}

                {!user && !commentFocused && (
                  <div className="flex items-center justify-center gap-1 md:gap-2 mt-2 text-xs md:text-sm text-gray-500">
                    <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Please log in to share your review</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Comments List */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-1 md:gap-2">
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              Student Discussions
              <span className="bg-purple-100 text-purple-800 text-xs rounded-full px-2 py-0.5 ml-1 md:ml-2">
                {comments.length}
              </span>
            </h4>

            {comments.length === 0 ? (
              <div className="text-center py-8 md:py-10 border border-dashed rounded-lg border-gray-200">
                <MessageSquare className="w-10 h-10 md:w-12 md:h-12 mx-auto text-gray-300 mb-2 md:mb-3" />
                <p className="text-gray-500 font-medium text-sm md:text-base">
                  No comments yet
                </p>
                <p className="text-gray-400 text-xs md:text-sm">
                  Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6 divide-y divide-gray-100">
                {visibleComments.map((c, index) => (
                  <div
                    key={index}
                    className={`${index > 0 ? "pt-4 md:pt-6" : ""}`}
                  >
                    <div className="flex gap-3 md:gap-4">
                      <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-gray-100">
                        <AvatarImage src="/placeholder.svg" alt="User avatar" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white text-xs md:text-sm">
                          {getUserInitials(c.user_id)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800 text-sm md:text-base">
                            {c.user_id.split("-")[0]}
                          </span>
                          <span className="text-gray-400 text-xs md:text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(c.created_at)}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2 md:mb-3 text-sm md:text-base">
                          {c.content}
                        </p>
                        <div className="flex gap-4 items-center">
                          <button className="text-gray-500 hover:text-purple-600 flex items-center gap-1 text-xs md:text-sm">
                            <ThumbsUp className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Helpful</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {comments.length > 3 && (
              <div className="flex justify-center mt-6 md:mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 text-xs md:text-sm py-1 px-3 md:py-2 md:px-4"
                >
                  {showAllComments ? "Show Less" : "Show All Comments"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
