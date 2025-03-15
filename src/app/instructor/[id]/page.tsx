import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Globe } from "lucide-react";
import { mockInstructors } from "@/utilities/instructors-mockdata";
import { notFound } from "next/navigation";


export default function InstructorProfilePage() {
  // Find instructor by ID
  const instructor = mockInstructors.find((i) => i.id === "1");

  if (!instructor) {
    notFound();
  }

  // Get instructor courses (mock data)
  const instructorCourses = [
    {
      id: "1",
      title: "Java And C++ Complete Course for Beginners 2022",
      thumbnail: "/Images/thumbnail.webp",
      duration: "3h 25m",
      students: 2300,
      price: "2000 Birr",
    },
    {
      id: "2",
      title: "Full-Stack Web Development: Build Responsive Websites",
      thumbnail: "/Images/thumbnail.webp",
      duration: "4h 30m",
      students: 1800,
      price: "3400 Birr",
    },
  ];

  return (
    <div className="mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Instructor Profile */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4">
                  <Image
                    src={"/Images/thumbnail.webp"}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-3xl font-extrabold text-center">
                  {instructor.name}
                </h1>
                <p className="text-purple-600 font-semibold text-center">
                  {instructor.industry}
                </p>

                <div className="flex space-x-3 mt-4">
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-purple-600"
                  >
                    <Facebook size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-purple-600"
                  >
                    <Twitter size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-purple-600"
                  >
                    <Linkedin size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-purple-600"
                  >
                    <Globe size={20} />
                  </Link>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-extrabold mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">
                  {instructor.bio ||
                    `${instructor.name} is a passionate ${instructor.industry} with extensive experience in teaching and mentoring students. With a focus on practical skills and real-world applications, they have helped thousands of students achieve their learning goals and advance their careers.`}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {instructor.expertise?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 text-sm font-semibold px-2.5 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  )) || (
                    <>
                      <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                        {instructor.industry}
                      </span>
                      <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                        Teaching
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Courses */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-extrabold mb-6">
              Courses by {instructor.name.split(" ")[0]}
            </h2>

            <div className="space-y-6">
              {instructorCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-64 h-48">
                      <Image
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <h3 className="text-2xl font-bold mb-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center text-base text-gray-500 mb-4">
                        <span className="mr-4">{course.duration}</span>
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-extrabold text-purple-600">
                          {course.price}
                        </span>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Enroll Now
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}

              {instructorCourses.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    {" This instructor doesn't have any courses yet."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
