"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import EditCategories from "../../components/Admin/Customization/EditCategories";
import AdminProtected from "@/app/hooks/adminProtected";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="KlassConnect - Admin"
          description="KlassConnect is a Learning platform for students to learn and get Help from experts"
          keywords="Programming,MERN,Coding"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            <EditCategories />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
