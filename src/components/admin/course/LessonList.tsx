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

const LessonList = ({ courseLesson }: { courseLesson: Lesson[] }) => {
  const [handleEdit, setHandleEdit] = useState<boolean>(false);
  // const [handleDelete, setHandleDelete] = useState<boolean>(false);
  const [lesson, setLesson] = useState<Lesson>();

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
                  onClick={() => {
                    setLesson(lesson);
                    setHandleEdit(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  title="Delete"
                  onClick={() => console.log("Delete")}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {handleEdit && lesson && (
        <EditLessonModal
          isOpen={handleEdit}
          onClose={() => setHandleEdit(false)}
          lesson={lesson}
        />
      )}
    </>
  );
};

export default LessonList;
