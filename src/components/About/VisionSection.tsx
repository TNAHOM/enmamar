import { ArrowRight, Star, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

const VisionSection = () => {
  const visionPoints = [
    {
      icon: <Star className="h-6 w-6" />,
      text: "Leading educational platform in East Africa",
    },
    {
      icon: <Users className="h-6 w-6" />,
      text: "Connecting 1 million+ Ethiopian learners",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      text: "Driving economic growth through skills development",
    },
  ];

  const futureGoals = [
    {
      year: "2025",
      title: "Pan-Ethiopian Reach",
      description:
        "Expanding to serve learners in all Ethiopian regions with localized content",
    },
    {
      year: "2026",
      title: "Skills Certification",
      description:
        "Launching nationally recognized certification programs in partnership with Ethiopian institutions",
    },
    {
      year: "2027",
      title: "Regional Hub",
      description:
        "Becoming the premier educational technology hub for East Africa",
    },
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="vision-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Vision Statement */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Content */}
            <div>
              <h2
                id="vision-heading"
                className="text-3xl font-bold mb-6 text-gray-900"
              >
                {"Our Vision for Ethiopia's Future"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mb-8"></div>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                We envision an Ethiopia where every citizen has access to
                world-class education, where traditional wisdom meets modern
                innovation, and where learning knows no boundaries.
              </p>

              <div className="space-y-4 mb-8">
                {visionPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center text-purple-600">
                      {point.icon}
                    </div>
                    <span className="text-gray-700 font-medium">
                      {point.text}
                    </span>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-4 border-purple-600 pl-6 italic text-lg text-gray-600">
                {
                  "Education is the most powerful weapon which you can use to change the world. We're putting that weapon in the hands of every Ethiopian."
                }
              </blockquote>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Images/landingPage-Image.png"
                  width={600}
                  height={400}
                  alt="Vision of Ethiopian education future with technology and traditional learning"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-xl font-semibold mb-2">
                    {"Building Tomorrow's Ethiopia"}
                  </h4>
                  <p className="text-sm opacity-90">
                    Through education, innovation, and unity
                  </p>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-100 z-20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2030</div>
                  <div className="text-sm text-gray-600">Vision Year</div>
                </div>
              </div>
            </div>
          </div>

          {/* Future Goals Timeline */}
          <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Our Roadmap to Impact
              </h3>
              <p className="text-lg text-gray-600">
                Key milestones in our journey to transform Ethiopian education
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {futureGoals.map((goal, index) => (
                <div key={index} className="relative">
                  {/* Timeline connector */}
                  {index < futureGoals.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 transform translate-x-4"></div>
                  )}

                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-purple-600">
                        {goal.year}
                      </span>
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-gray-900">
                      {goal.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ethiopian Development Vision */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 p-0.5 rounded-2xl">
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {"Contributing to Ethiopia's Development Goals"}
                </h3>
                <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
                  {
                    "Our educational platform aligns with Ethiopia's national development priorities, contributing to the country's transformation into a lower-middle-income economy through human capital development and skills enhancement."
                  }
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span>Sustainable Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span>Economic Growth</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span>Social Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
