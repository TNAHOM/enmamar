import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative bg-purple-600 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-purple-900/60 mix-blend-multiply" />
        {/* Ethiopian flag inspired gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-yellow-500/10 to-red-600/10 mix-blend-soft-light" />
      </div>

      <div className="relative container mx-auto px-4 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20">
                🇪🇹 Made for Ethiopia
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Empowering Ethiopian
              <span className="block text-yellow-300">Minds to Excel</span>
            </h1>

            <p className="text-xl max-w-xl mb-8 leading-relaxed">
              We believe every Ethiopian deserves access to world-class
              education. Enmamar bridges the gap between ambition and
              opportunity through culturally relevant, expert-led online
              learning.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-white/90">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Ethiopian-focused content</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm">Local expert instructors</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-sm">Accessible learning</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Images/landingPage-Image.png"
                  priority
                  width={600}
                  height={400}
                  alt="Ethiopian students learning online with Enmamar platform"
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 bg-white text-purple-900 p-4 rounded-lg shadow-lg transform rotate-6 z-20">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📚</span>
                <div>
                  <p className="font-semibold text-sm">Quality Education</p>
                  <p className="text-xs text-gray-600">For Every Ethiopian</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 rounded-lg shadow-lg transform -rotate-3 z-20">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌟</span>
                <div>
                  <p className="font-semibold text-sm">Expert Instructors</p>
                  <p className="text-xs opacity-90">Ethiopian Professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
