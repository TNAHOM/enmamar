import { Metadata } from "next";
import HeroSection from "@/components/About/HeroSection";
import MissionSection from "@/components/About/MissionSection";
import ValuesSection from "@/components/About/ValuesSection";
import VisionSection from "@/components/About/VisionSection";
// import ImpactSection from "@/components/about/ImpactSection";
// import CallToActionSection from "@/components/about/CallToActionSection";

// SEO Metadata
export const metadata: Metadata = {
  title:
    "About Enmamar - Ethiopian Online Learning Platform | Quality Education for All",
  description:
    "Discover Enmamar's mission to revolutionize education in Ethiopia through accessible online courses, expert Ethiopian instructors, and culturally relevant learning experiences.",
  keywords:
    "Ethiopian education, online learning Ethiopia, Ethiopian courses, Amharic learning, Ethiopian skills development, distance education Ethiopia, professional development Ethiopia",
  openGraph: {
    title: "About Enmamar - Transforming Ethiopian Education Online",
    description:
      "Learn about our mission to make quality education accessible to every Ethiopian through innovative online learning platform with local expertise.",
    type: "website",
    locale: "en_ET",
    siteName: "Enmamar",
  },
  alternates: {
    canonical: "https://enmamar.com/about",
  },
};

export default function AboutPage() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Enmamar",
    description:
      "Ethiopian online learning platform providing quality education through expert instructors",
    url: "https://enmamar.com",
    logo: "https://enmamar.com/logo.png",
    foundingLocation: {
      "@type": "Place",
      name: "Addis Ababa, Ethiopia",
    },
    areaServed: {
      "@type": "Country",
      name: "Ethiopia",
    },
    serviceType: "Online Education Platform",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ethiopian Online Courses",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Professional Development Courses",
          },
        },
      ],
    },
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-50">
        <HeroSection />
        <MissionSection />
        <ValuesSection />
        <VisionSection />
        {/* <ImpactSection /> */}
        {/* <CallToActionSection /> */}
      </div>
    </>
  );
}
