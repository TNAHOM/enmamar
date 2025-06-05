import { Shield, BookOpen, Lightbulb, Globe } from "lucide-react";

const ValuesSection = () => {
  const values = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Excellence & Integrity",
      description:
        "We uphold the highest standards in education delivery while maintaining transparency and authenticity in everything we do.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <BookOpen className="h-12 w-12" />,
      title: "Inclusive Learning",
      description:
        "Education should be accessible to all Ethiopians regardless of location, background, or economic status. We break down barriers to learning.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Lightbulb className="h-12 w-12" />,
      title: "Innovation & Tradition",
      description:
        "We blend cutting-edge technology with time-tested Ethiopian wisdom, creating learning experiences that are both modern and culturally grounded.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Community Impact",
      description:
        "Every course, every lesson, every success story contributes to building a stronger, more educated Ethiopian society for future generations.",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="values-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              id="values-heading"
              className="text-3xl font-bold mb-6 text-gray-900"
            >
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every course we
              create
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Background decoration */}
                <div
                  className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${value.color} rounded-t-2xl`}
                ></div>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${value.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {value.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-200 transition-colors duration-300"></div>
              </div>
            ))}
          </div>

          {/* Ethiopian Unity Message */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Unity in Diversity
              </h3>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {
                  "Ethiopia's strength lies in its diversity - over 80 languages, numerous cultures, and rich traditions. Our platform celebrates this diversity while creating unified pathways to educational excellence for all Ethiopians."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
