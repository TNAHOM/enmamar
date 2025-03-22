import LandingPage from "@/components/landingPage/LandingPage";
import TemplateTopic from "@/components/course/TemplateTopic";

export default function Home() {  
  return (
    <div className="">
      <LandingPage />

      <TemplateTopic
        header={{
          topic: "Featured Courses",
          description:
            "Discover our handpicked courses setting benchmarks in excellence!",
        }}
      />
      <TemplateTopic header = {{
        topic: "Explore Courses",
        description: "Browse through a diverse selection of courses designed to elevate your skills."
      }}
      />
    </div>
  );
}
