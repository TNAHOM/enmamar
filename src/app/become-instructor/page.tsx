import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

export default function BecomeInstructorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-purple-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-purple-900/60 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Share Your Knowledge
            </h1>
            <p className="text-xl max-w-xl">
              Join our community of expert instructors and help students across
              Ethiopia achieve their learning goals.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Become an Instructor</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {
                "We're looking for passionate experts to join our teaching team. Contact our administrators to start your journey as an Enmamar instructor."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative">
              <div className="sticky top-24">
                <h3 className="text-2xl font-semibold mb-6">
                  Contact Our Team
                </h3>
                <p className="text-gray-600 mb-8">
                  {
                    "Our administrator team is ready to help you get started. Reach out through any of the following channels and we'll guide you through the process of becoming an instructor."
                  }
                </p>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                  <h4 className="font-medium text-purple-800 mb-2">
                    Why Teach with Enmamar?
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-200 flex items-center justify-center mr-2 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                      </div>
                      <span>Reach thousands of Ethiopian students</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-200 flex items-center justify-center mr-2 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                      </div>
                      <span>Earn income from your expertise</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-200 flex items-center justify-center mr-2 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                      </div>
                      <span>Flexible teaching schedule</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-200 flex items-center justify-center mr-2 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                      </div>
                      <span>Technical support for course creation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="h-2 bg-purple-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-gray-600">
                        Call our administrator team
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:+251912345678"
                    className="block text-xl font-medium text-purple-600 hover:text-purple-700"
                  >
                    +251 91 234 5678
                  </a>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-lg">
                <div className="h-2 bg-purple-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-600">Send us a message anytime</p>
                    </div>
                  </div>
                  <a
                    href="mailto:instructors@enmamar.com"
                    className="block text-xl font-medium text-purple-600 hover:text-purple-700"
                  >
                    instructors@enmamar.com
                  </a>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-lg">
                <div className="h-2 bg-purple-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <Send className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Telegram</h3>
                      <p className="text-gray-600">Chat with us on Telegram</p>
                    </div>
                  </div>
                  <a
                    href="https://t.me/enmamar_instructors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xl font-medium text-purple-600 hover:text-purple-700"
                  >
                    @enmamar_instructors
                  </a>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-lg">
                <div className="h-2 bg-purple-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Office Address</h3>
                      <p className="text-gray-600">Visit us in person</p>
                    </div>
                  </div>
                  <address className="not-italic text-xl font-medium text-purple-600">
                    Bole Road, Friendship Building
                    <br />
                    4th Floor, Office 405
                    <br />
                    Addis Ababa, Ethiopia
                  </address>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today and join our growing community of instructors
              making a difference in education across Ethiopia.
            </p>
            <Link href="tel:+251912345678">
              <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6 h-auto">
                Call Us Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative mb-8">
              <div className="absolute -top-6 -left-6 text-6xl text-purple-300">
                {'"'}
              </div>
              <blockquote className="text-xl italic text-gray-700 relative z-10">
                {
                  "Teaching on Enmamar has been an incredible experience. The platform is easy to use, the support team is always helpful, and I've been able to reach students across Ethiopia with my courses."
                }
              </blockquote>
              <div className="absolute -bottom-6 -right-6 text-6xl text-purple-300">
                {'"'}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Instructor"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold">Tiahun Abebe</p>
                <p className="text-sm text-gray-600">Programming Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
