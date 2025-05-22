"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { InstructorCourseAnalytics } from "@/types/instructor";
import { toast } from "sonner";

interface InstructorProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_picture: string;
}

interface Lesson {
  // Define properties for a lesson, e.g.:
  id: string;
  title: string;
  duration?: number;
  // ... other lesson properties
}

export interface InstructorCourse {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  students: number;
  price: number;
  description: string;
  lessons: Lesson[];
}

export default function InstructorProfilePage() {
  const params = useParams();
  const instructorId = params.id as string;

  const [instructor, setInstructor] = useState<Partial<InstructorProfile>>();
  const [instructorCourses, setInstructorCourses] = useState<
    InstructorCourse[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/instructors/analytics/${instructorId}`
        );

        if (!response.ok) {
          setError("Failed to load instructor data");
          toast.error("Failed to load instructor data");
          return;
        }

        const data: InstructorCourseAnalytics[] = await response.json();
        console.log(data, "data instr course");
        if (data.length > 0) {
          const instructorInfo = data[0].course.instructor;
          setInstructor({
            id: instructorInfo.id,
            first_name: instructorInfo.first_name,
            last_name: instructorInfo.last_name,
            email: instructorInfo.email,
            phone_number: instructorInfo.phone_number,
            profile_picture:
              instructorInfo.profile_picture || "/Images/thumbnail.webp",
          });

          // Process courses data
          const courses = data.map((item) => {
            const totalMinutes = item.course.lessons.reduce((total, lesson) => {
              return total + (lesson.duration || 0);
            }, 0);

            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const durationFormatted = `${hours}h ${minutes}m`;

            return {
              id: item.course.id,
              title: item.course.title,
              thumbnail: item.course.thumbnail_url || "/Images/thumbnail.webp",
              duration: durationFormatted,
              students: item.no_of_enrollments,
              price: item.course.price,
              description: item.course.description,
              lessons: item.course.lessons,
            };
          });

          setInstructorCourses(courses);
        } else {
          setError("No courses found for this instructor");
        }
      } catch (err) {
        setError("Failed to load instructor data");
        console.warn(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorData();
  }, [instructorId]);

  // define fullName to fix lint error
  const fullName = `${instructor?.first_name ?? ""} ${
    instructor?.last_name ?? ""
  }`.trim();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading instructor profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar: Profile, About, Expertise */}
          <div className="md:col-span-1 space-y-6 md:sticky md:top-24">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={
                      instructor?.profile_picture || "/Images/thumbnail.webp"
                    }
                    alt={fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">{fullName}</h1>
                  <p className="text-purple-600 font-medium">Lecturer</p>
                </div>
                {/* <div className="flex justify-center md:justify-start space-x-4">
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <Facebook size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <Twitter size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <Linkedin size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <Globe size={20} />
                  </Link>
                </div> */}
              </div>
            </div>

            {/* About Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <span className="w-1 h-6 bg-purple-600 rounded-full mr-2"></span>
                About
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {`${fullName} is a passionate Lecturer with extensive experience in teaching and mentoring students. With a focus on practical skills and real-world applications, they have helped thousands of students achieve their learning goals and advance their careers.`}
              </p>
            </div>

            {/* Expertise Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <span className="w-1 h-6 bg-purple-600 rounded-full mr-2"></span>
                Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {/* {instructor?.expertise?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                )) || ( */}
                <>
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    Lecturer
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    Teaching
                  </span>
                </>
                {/* )} */}
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold mb-1 flex items-center">
                <span className="w-1 h-6 bg-purple-600 rounded-full mr-2"></span>
                Courses by {instructor?.first_name || "Instructor"}
              </h2>
              <p className="text-gray-500 mb-4">
                Enroll in these high-quality courses to elevate your skills
              </p>
            </div>

            <div className="space-y-4">
              {instructorCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/course/${course.id}`}>
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-64 h-48 md:h-auto">
                        <Image
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent md:hidden"></div>
                        <div className="absolute top-4 left-4 md:hidden">
                          <h3 className="text-xl font-bold text-white">
                            {course.title}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="flex-1 p-6">
                        <h3 className="text-xl font-bold mb-2 hidden md:block">
                          {course.title}
                        </h3>
                        <div className="flex items-center text-base text-gray-500 mb-4">
                          <div className="flex items-center mr-4">
                            <Clock size={16} className="mr-1 text-purple-500" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Users size={16} className="mr-1 text-purple-500" />
                            <span>
                              {course.students.toLocaleString()} students
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-bold text-purple-600">
                            {course.price}
                          </span>
                          <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6">
                            Enroll Now
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Link>
                </Card>
              ))}

              {instructorCourses.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                      No Courses Yet
                    </h3>
                    <p className="text-gray-500">
                      This instructor doesn’t have any courses available at the
                      moment. Check back later!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
