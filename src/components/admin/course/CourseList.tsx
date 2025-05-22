import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useGetTopicCourses } from "@/hooks/useGetCourses";
// import { course } from "@/types/courses";

interface CourseListProps {
  title: string;
  viewAll: string;
}

export function CourseList({ title, viewAll }: CourseListProps) {
  // const { data, error, loading }
  const { data } = useGetTopicCourses();

  const courses = data?.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link
          href={viewAll}
          className="text-sm text-purple-600 hover:underline flex items-center"
        >
          View all
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses &&
          courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={"/Images/JavaCourse.png"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    Instructor:{" "}
                    {`${course.instructor.first_name} ${course.instructor.last_name}`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span>3h 37min</span>
                    {/* {course.views && ( */}
                    {/* <span className="text-green-500">
                      {course.views.toLocaleString()} users
                      {course.views} users
                    </span> */}
                    {/* )} */}
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
