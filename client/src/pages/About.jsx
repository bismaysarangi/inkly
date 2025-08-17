import { Card } from "flowbite-react";
import { FaPenFancy, FaUsers, FaGlobe } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Inkly
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Inkly is a platform for writers and readers to connect, share ideas,
          and explore new perspectives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 dark:bg-gray-700 rounded-full">
              <FaPenFancy className="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            For Writers
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Share your stories, ideas, and expertise with a global audience. Get
            feedback and connect with readers.
          </p>
        </Card>

        <Card className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 dark:bg-gray-700 rounded-full">
              <FaUsers className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            For Readers
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Discover fresh perspectives, learn new things, and engage with
            writers from around the world.
          </p>
        </Card>

        <Card className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-indigo-100 dark:bg-gray-700 rounded-full">
              <FaGlobe className="text-indigo-600 dark:text-indigo-400 text-2xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Our Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            To create a platform that fosters meaningful connections through the
            power of words and ideas.
          </p>
        </Card>
      </div>

      <Card className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Our Story
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Inkly was founded in 2023 with a simple goal: to create a space where
          writers and readers could come together to share and discover great
          content. What started as a small project has grown into a vibrant
          community of thousands of users from around the world.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          We believe that everyone has a story to tell and that great ideas
          deserve to be heard. Whether you're a professional writer or just
          starting out, Inkly provides the tools and audience you need to share
          your voice.
        </p>
      </Card>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Ready to start your journey with Inkly? Sign up today and become part
          of our growing community.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/sign-up"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:opacity-90"
          >
            Sign Up
          </a>
          <a
            href="/sign-in"
            className="px-6 py-3 border border-purple-600 text-purple-600 dark:text-purple-400 font-medium rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
