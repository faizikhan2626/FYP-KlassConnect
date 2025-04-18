"use client";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CourseContent from "../../components/Course/CourseContent";

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data?.user) {
      const isPurchased = data.user.courses.some(
        (course: any) => course.courseId === id
      );

      if (!isPurchased) {
        router.push("/");
      }
    }
    if (error) {
      router.push("/");
    }
  }, [data, error, id, router]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} user={data.user} />
        </div>
      )}
    </>
  );
};

export default Page;
