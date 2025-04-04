/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Routes/Hero";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
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
    </div>
  );
};

export default Page;
