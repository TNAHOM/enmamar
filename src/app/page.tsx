import Filter from "@/component/filter";
import LandingPage from "@/component/landingPage/LandingPage";
import TemplateTopic from "@/component/TemplateTopic";

export default function Home() {
  return (
    <div className="">
      <LandingPage />
      <Filter />
      <TemplateTopic topic="Featured Courses" description="Explore Our Top-Rated Courses—Learn from the Best in Every Field!" />
      </div>
    );
}