import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lesson } from "@/types/courses";

const LessonList = ({ courseLesson }: { courseLesson: Lesson[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Video link</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courseLesson.map((lesson) => (
          <TableRow key={lesson.id}>
            <TableCell>{lesson.title}</TableCell>
            <TableCell>{lesson.video_url}</TableCell>
            <TableCell>{lesson.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LessonList;
