import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { Users, BookOpen, Award, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-8">
              About Inkly
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Inkly is a modern blogging platform designed for developers,
              writers, and knowledge sharers. We believe in the power of shared
              knowledge and community-driven learning.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              To create a platform where knowledge flows freely, connecting
              writers with readers who are passionate about learning and growing
              together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Quality Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Curated articles and tutorials from experienced professionals
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Community
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                A supportive community of learners and educators
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
              <Award className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Commitment to providing the best reading and writing experience
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
              <Heart className="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Passion
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with love for knowledge sharing and continuous learning
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                <p>
                  Inkly was born from a simple idea: that knowledge should be
                  accessible, shareable, and engaging. We noticed that while
                  there were many platforms for sharing content, few focused
                  specifically on creating a beautiful, intuitive experience for
                  both writers and readers.
                </p>
                <p>
                  Our team of passionate developers and designers came together
                  to create a platform that not only looks great but also
                  provides powerful tools for content creation, discovery, and
                  community interaction.
                </p>
                <p>
                  Today, Inkly hosts thousands of articles from writers around
                  the world, covering everything from web development and
                  programming to design, career advice, and technology trends.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://picsum.photos/600/400?random=about"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm">Happy Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Inkly?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Built for modern content creators and knowledge seekers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Rich Text Editor
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Write with our powerful editor that supports formatting, code
                blocks, and media embedding.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Dark Mode
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enjoy reading and writing in both light and dark themes for
                optimal comfort.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Search & Discovery
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find exactly what you're looking for with our advanced search
                and filtering options.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Community Engagement
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Like, comment, and interact with content creators and fellow
                readers.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Admin Dashboard
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive analytics and management tools for content
                administrators.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Mobile Responsive
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Perfect reading and writing experience across all devices and
                screen sizes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of writers and readers sharing knowledge on Inkly
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button color="light" size="xl" className="font-semibold">
                Get Started
              </Button>
            </Link>
            <Link to="/search">
              <Button
                color="light"
                size="xl"
                outline
                className="font-semibold text-white border-white hover:bg-white hover:text-purple-600"
              >
                Browse Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
