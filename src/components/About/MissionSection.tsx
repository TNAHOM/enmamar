import { Target, Heart, Users, Zap } from "lucide-react";

const MissionSection = () => {
  const missionPoints = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Accessible Education",
      description:
        "Breaking geographical and economic barriers to bring quality education to every corner of Ethiopia, from Addis Ababa to the remotest regions.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Cultural Relevance",
      description:
        "Creating learning experiences that resonate with Ethiopian values, contexts, and real-world applications for local success.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Building",
      description:
        "Fostering a supportive learning community where Ethiopian students and instructors collaborate and grow together.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Skills Empowerment",
      description:
        "Equipping Ethiopians with in-demand skills to thrive in the modern economy while preserving our rich cultural heritage.",
    },
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="mission-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              id="mission-heading"
              className="text-3xl font-bold mb-6 text-gray-900"
            >
              Our Mission: Transforming Ethiopian Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {
                "Enmamar exists to democratize quality education across Ethiopia. We're building bridges between Ethiopian expertise and learners, creating pathways to success that honor our heritage while embracing global standards."
              }
            </p>
          </div>

          {/* Mission Points Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {missionPoints.map((point, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-purple-600 group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                    {point.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ethiopian Context Highlight */}
          <div className="bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 p-8 rounded-2xl border border-gray-100">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Built for Ethiopia, By Ethiopians
              </h3>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {"Understanding the unique challenges and opportunities in Ethiopian education, we've crafted a platform that respects our diverse languages, cultures, and learning traditions while preparing our people for a globally connected future."}
              </p>
              <div className="mt-6 flex justify-center items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🌍</span>
                  <span>Global Standards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🏛️</span>
                  <span>Local Heritage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🤝</span>
                  <span>Community First</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
