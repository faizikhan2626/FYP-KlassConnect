"use client";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AboutPage = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={4}
        route={route}
        setRoute={setRoute}
      />
      <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-black dark:to-gray-900 text-black dark:text-white">
        <div className="max-w-[800px] mx-auto px-5 py-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[crimson] dark:text-[#37a392]">
            About KlassConnect
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            KlassConnect is an innovative education platform designed to bring
            smart education to the forefront. Our mission is to revolutionize
            the learning experience through the integration of advanced
            technologies like AI, machine learning, and real-time collaboration
            tools.
          </p>

          <div className="space-y-8">
            {/* Mission Statement */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                At KlassConnect, we aim to provide a smarter, more inclusive,
                and efficient learning experience. Our platform enables
                personalized learning, supports collaboration, and empowers
                educators with tools that enhance their teaching effectiveness.
              </p>
            </div>

            {/* Technologies Behind KlassConnect */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Technologies We Use
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                KlassConnect is powered by cutting-edge technologies such as:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Next.js for building fast and scalable applications.</li>
                <li>TypeScript for type safety and better code quality.</li>
                <li>
                  OpenAI for AI-driven features, such as personalized learning
                  and quizzes.
                </li>
                <li>MongoDB for flexible and scalable database management.</li>
                <li>
                  Node.js and Express for building efficient server-side
                  applications.
                </li>
              </ul>
            </div>

            {/* Join Us Call to Action */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Join Us in Shaping the Future of Education
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                At KlassConnect, we are constantly pushing the boundaries of
                what’s possible in education. Whether you're a student,
                educator, or a developer, there's a place for you to be part of
                our growing community.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
