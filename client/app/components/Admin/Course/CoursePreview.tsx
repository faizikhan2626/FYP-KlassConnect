import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "@/app/styles/style";
import Ratings from "../../../../app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };
  const createCourse = () => {
    handleCourseCreate();
  };
  return (
    <div className="w-[90%] m-auto py-5 mb-5 ">
      <div className="w-full relative ">
        <div className="w-full mt-10">
          <h1 className="text-[25px] font-Poppins font-[600] ">
            {courseData?.name}
          </h1>
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : `${"Rs." + courseData?.price}`}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 ">
            Rs.{courseData?.estimatedPrice}
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentagePrice}% off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`flex flex-row justify-center items-center py-3 px-6 rounded-full dark:hover:text-black  text-black   min-h-[40px]  text-[16px]  font-bold dark:text-white   !w-[150px] my-3 font-Poppins !bg-[crimson] hover:text-white text-center  cursor-not-allowed`}>
            Buy Now Rs.{courseData?.price}
          </div>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount Code"
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`w-[70%] 800px:w-[180px] hover:bg-[#208b81] text-black dark:text-white flex items-center justify-center mr-2 h-[40px] bg-[#37a39a] text-center rounded ml-2 cursor-pointer`}>
            Apply
          </div>
        </div>
        <p className="pb-1">* Source code included</p>
        <p className="pb-1">* Lifetime access </p>
        <p className="pb-1">* Certificate of Completion</p>
        <p className="pb-3 800px:pb-1">* Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <div className="flex items-center pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5 className="pl-2">0 buyers</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600] ">
            What will you learn from this course?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2 " key={index}>
            <div className="w-[15px] mr-1 ">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />

        {/*Course PreRequisites*/}
        <h1 className="text-[25px] font-Poppins font-[600] ">
          What are the prerequisites for this course?
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2 " key={index}>
            <div className="w-[15px] mr-1 ">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        {/*Course Description*/}
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600] ">
            Course Details
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden ">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="flex w-full items-center justify-between ">
        <div
          className="hover:bg-[#208b81] text-black dark:text-white w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center  rounded mt-8 cursor-pointer "
          onClick={() => prevButton()}>
          Previous
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center hover:bg-[#208b81] text-black dark:text-white rounded mt-8 cursor-pointer "
          onClick={() => createCourse()}>
          Create
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
