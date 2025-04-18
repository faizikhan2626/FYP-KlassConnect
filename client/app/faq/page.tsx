"use client";
import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import FAQ from "../components/FAQ/FAQ";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <div className="h-screen overflow-hidden relative">
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={6}
          route={route}
          setRoute={setRoute}
        />
        <FAQ />
        <div className="absolute bottom-0 left-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default page;
