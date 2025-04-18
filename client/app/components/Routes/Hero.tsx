"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

const Hero = () => {
  const { theme } = useTheme();
  const { data } = useGetHeroDataQuery("Banner", {});

  return (
    <section className="w-full flex items-center justify-center min-h-[90vh] px-6 md:px-12 lg:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={data?.layout?.banner?.image?.url}
            alt="Hero Image"
            width={500}
            height={500}
            priority
          />
        </div>
        {/* Right Content */}
        <div className="text-center md:text-left w-full md:w-1/2">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
            KlassConnect{" "}
            <span className="text-5xl dark:text-[#37a392] text-[crimson]">
              "{data?.layout?.banner?.title}"
            </span>
          </h1>
          <p className="pt-8 text-l text-gray-600 dark:text-gray-300">
            {data?.layout?.banner?.subTitle}
          </p>

          {/* 🔍 Search Bar */}
          <div className="mt-6 flex items-center justify-center md:justify-start bg-gray-200 text-black dark:bg-gray-800 p-2 rounded-full shadow-md border border-gray-300 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search courses, AI tools..."
              className="w-full px-4 py-2 bg-transparent text-gray-900 dark:text-white focus:outline-none"
            />
            <button
              className="px-6 py-2 dark:text-[#37a392] text-[crimson] rounded-full bg-white hover:bg-[crimson] hover:text-black dark:hover:bg-[#37a392] dark:hover:text-white transition font-Poppins font-semibold
             max-[500px]:py-1 max-[500px]:px-2">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
