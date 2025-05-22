import LandingPage from "@/components/landingPage/LandingPage";
import TemplateTopic from "@/components/course/TemplateTopic";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <LandingPage />

      <div className="w-full space-y-8 py-12">
        {/* <TemplateTopic
          header={{
            topic: "Featured Courses",
            description:
              "Discover our handpicked courses setting benchmarks in excellence!",
          }}
        /> */}

        <TemplateTopic
          header={{
            topic: "Explore Courses",
            description:
              "Browse through a diverse selection of courses designed to elevate your skills.",
          }}
        />
      </div>
    </div>
  );
}
