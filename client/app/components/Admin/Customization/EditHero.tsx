/* eslint-disable @next/next/no-img-element */
"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("/assets/hero1.png");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title || "");
      setSubTitle(data?.layout?.banner?.subTitle || "");
      setImage(data?.layout?.banner?.image?.url || "/assets/hero1.png");
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero updated Successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <section className="w-full flex items-center justify-center min-h-[90vh] px-6 md:px-12 lg:px-20 h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        {/* Left Image */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <Image
            src={image}
            alt="Hero Image"
            width={500}
            height={500}
            priority
          />
          <input
            type="file"
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />
          <label
            htmlFor="banner"
            className="absolute bottom-14 right-10 cursor-pointer">
            <AiOutlineCamera className="text-2xl dark:text-white text-black " />
          </label>
        </div>

        {/* Right Content */}
        <div className="text-center md:text-left w-full md:w-1/2">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Discover the Future of AI Learning"
            rows={3}
            className="text-5xl font-bold bg-transparent leading-tight overflow-hidden resize-none "
          />

          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 20k+ online Courses. Find your desired course from them."
            rows={3}
            className="w-full mt-4 resize-none text-xl bg-transparent text-gray-600 dark:text-gray-300 focus:outline-none"
          />

          <div
            className={`mt-6 px-6 py-2 rounded-full shadow-md transition font-semibold cursor-pointer
              ${
                title !== data?.layout?.banner?.title ||
                subTitle !== data?.layout?.banner?.subTitle ||
                image !== data?.layout?.banner?.image?.url
                  ? "bg-[#42d383] text-black hover:bg-[#37a392]"
                  : "bg-gray-300 cursor-not-allowed"
              }
              absolute bottom-100 right-60`}
            onClick={
              title !== data?.layout?.banner?.title ||
              subTitle !== data?.layout?.banner?.subTitle ||
              image !== data?.layout?.banner?.image?.url
                ? handleEdit
                : () => {}
            }>
            Save
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditHero;
