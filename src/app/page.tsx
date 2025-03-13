import LandingPage from "@/components/landingPage/LandingPage";
import TemplateTopic from "@/components/course/TemplateTopic";
// import { useGetCourses } from "@/hooks/useGetCourses";

export default function Home() {
  return (
    <div className="">
      <LandingPage />

      <TemplateTopic
        topic="Featured Courses"
        description="Discover our handpicked courses setting benchmarks in excellence!"
        // contents={data}
      />
      <TemplateTopic
        topic="Explore Courses"
        description="Browse through a diverse selection of courses designed to elevate your skills."
        // contents={data}
      />
    </div>
  );
}
