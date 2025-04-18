"use client"; // <-- Add this line to indicate client-side component

import React, { FC, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type Props = {};

const page: FC<Props> = (Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <div className="h-screen bg-white dark:bg-gradient-to-b dark:from-black dark:to-gray-900 text-black dark:text-white py-10 px-5 md:px-20">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[crimson] dark:text-[#37a392]">
            Introducing KlassConnect: The Future of Smart Education
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            April 10, 2025 — by KlassConnect Team
          </p>
          <div className="text-lg leading-relaxed text-gray-800 dark:text-gray-300 space-y-4">
            <p>
              KlassConnect is an innovative education platform that bridges
              intelligent solutions with modern classrooms. From AI-powered quiz
              tools to real-time collaboration and adaptive learning modules,
              our mission is to make education smarter, more inclusive, and
              efficient.
            </p>

            <p>
              Built using the latest technologies like Next.js, TypeScript, and
              OpenAI APIs, KlassConnect ensures a smooth experience for both
              students and educators. Whether you're managing tasks, joining
              interactive quizzes, or accessing educational resources — it's all
              in one place.
            </p>

            <p>
              Join us in reshaping the way we learn, teach, and grow. The future
              of education is here — and it's smart.
            </p>

            <p className="italic text-gray-500 dark:text-gray-400">
              Thank you for supporting KlassConnect on this journey.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
