import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lesson } from "@/types/courses";
import { Pencil, Trash2 } from "lucide-react";
import { EditLessonModal } from "./EditLessonModal";
import { toast } from "sonner";

const LessonList = ({
  courseLesson,
  courseId,
}: {
  courseLesson: Lesson[];
  courseId: string;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleEditClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedLesson(null);
  };

  // Delete lesson handler with toast notifications
  const handleDeleteLesson = async (lessonId: string) => {
    try {
      const res = await fetch(`/api/course/${courseId}/lesson/${lessonId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete lesson");
      toast.success("Lesson deleted successfully");
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Error deleting lesson";
      toast.error(msg);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Video link</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseLesson.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.title}</TableCell>
              <TableCell>{lesson.video_url}</TableCell>
              <TableCell>{lesson.duration}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  title="Edit"
                  onClick={() => handleEditClick(lesson)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  title="Delete"
                  onClick={() => handleDeleteLesson(lesson.id)}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditLessonModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        courseId={courseId}
        lessonId={selectedLesson?.id || ""}
        lessonData={selectedLesson}
      />
    </>
  );
};

export default LessonList;
