// import Filter from "@/component/filter";
import LandingPage from "@/component/landingPage/LandingPage";
import TemplateTopic from "@/component/TemplateTopic";
import { mockCourse } from "@/utilities/mock";

export default function Home() {
  return (
    <div className="">
      <LandingPage />
      {/* <Filter /> */}
      <TemplateTopic
      topic="Featured Courses"
      description="Discover our handpicked courses setting benchmarks in excellence!"
      contents={mockCourse}
      />
      <TemplateTopic
      topic="Explore Courses"
      description="Browse through a diverse selection of courses designed to elevate your skills."
      contents={mockCourse}
      />
    </div>
  );
}
