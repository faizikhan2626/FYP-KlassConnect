/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Routes/Hero";
import Courses from "./components/Routes/Courses";
import Reviews from "./components/Routes/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";
interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div className="h-full">
      <Heading
        title="KlassConnect"
        description="KlassConnect is a Learning platform for students to learn and get Help from experts"
        keywords="Programming,MERN,Coding"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
