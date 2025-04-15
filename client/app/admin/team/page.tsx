/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import React from "react";
import Heading from "../../utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../../hooks/adminProtected";
import DashboardHero from "../../components/Admin/DashboardHero";
import AllUsers from "../../components/Admin/Users/AllUsers";

type Props = {};

const Page = (props: Props) => {
  return (
    <AdminProtected>
      <Heading
        title="KlassConnect - Admin"
        description="KlassConnect is a Learning platform for students to learn and get help from experts"
        keywords="Programming, MERN, Coding"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <AllUsers isTeam={true} />
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
