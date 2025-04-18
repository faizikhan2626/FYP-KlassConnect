/* eslint-disable @typescript-eslint/no-require-imports */
import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Sammy",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Bahria university",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quam voluptates numquam quos architecto pariatur id iure dolorum ut inventore autem, suscipit at eum ratione. Aliquam sunt inventore quaerat odio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quam voluptates numquam quos architecto pariatur id iure dolorum ut inventore autem, suscipit at eum ratione. Aliquam sunt inventore quaerat odio?",
  },
  {
    name: "Zoey",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quam voluptates numquam quos architecto pariatur id iure dolorum ut inventore autem, suscipit at eum ratione. Aliquam sunt inventore quaerat odio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quam voluptates numquam quos architecto pariatur id iure dolorum ut inventore autem, suscipit at eum ratione. Aliquam sunt inventore quaerat odio?",
  },
  {
    name: "Samuel",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Footballer | France",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quam voluptates numquam quos architecto pariatur id iure dolorum ut inventore autem, suscipit at eum ratione. Aliquam sunt inventore quaerat odio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quam voluptates numquam quos architecto pariatur id iure dolorum ut inventore autem, suscipit at eum ratione. Aliquam sunt inventore quaerat odio?",
  },
  {
    name: "Reena",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Cricketer | Pakistan",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quam voluptates numquam quos architecto pariatur id iure dolorum ut inventore autem, suscipit at eum ratione. Aliquam sunt inventore quaerat odio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quam voluptates numquam quos architecto pariatur id iure dolorum ut inventore autem, suscipit at eum ratione. Aliquam sunt inventore quaerat odio?",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto mt-60">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/hero2.png")}
            alt=""
            width={500}
            height={500}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are{" "}
            <span className="dark:text-[#37a392] text-[crimson]">
              Our Strength
            </span>
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            At KlassConnect, we value every piece of feedback from our
            customers. Your reviews help us understand what we’re doing right
            and where we can improve. Real stories from real people guide others
            in making informed decisions and inspire us to deliver better
            products and services. Every review matters, and we’re grateful for
            your honest insights. Join the conversation and help us continue to
            grow and provide exceptional experiences.
          </p>
        </div>
      </div>

      <div className="mt-60 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {reviews.map((i, index) => (
          <ReviewCard item={i} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
