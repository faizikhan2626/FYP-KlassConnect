import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
};

const CourseDetails = ({ data, stripePromise, clientSecret }: Props) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [open, setOpen] = useState(false);
  const user = userData?.user;
  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased = user?.courses?.some(
    (item: any) => item.courseId?.toString() === data?._id?.toString()
  );

  const handleOrder = (e: any) => {
    setOpen(true);
  };

  return (
    <div className="w-[90%] 800px:w-[90%] m-auto py-5">
      <div className="w-full flex flex-col-reverse 800px:flex-row">
        <div className="w-full 800px:w-[65%] 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            {data?.name}
          </h1>

          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={data.ratings} />
              <h5 className="text-black dark:text-white ml-2">
                {Number.isInteger(data?.ratings)
                  ? data?.ratings.toFixed(1)
                  : data?.ratings.toFixed(2)}{" "}
                Course Rating •
              </h5>
              <h5 className="text-black dark:text-white ml-2">
                {data?.reviews?.length} Reviews
              </h5>
            </div>
            <h5 className="text-black dark:text-white">
              {data.purchased} Purchased
            </h5>
          </div>

          <br />

          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            What you will learn from this course?
          </h1>
          {data.benefits?.map((item: any, index: number) => (
            <div key={index} className="w-full flex 800px:items-center py-2">
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline
                  size={20}
                  className="text-black dark:text-white"
                />
              </div>
              <p className="pl-2 text-black dark:text-white">{item.title}</p>
            </div>
          ))}

          <br />
          <br />

          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            What are the Pre-requisites of this course?
          </h1>
          {data.prerequisites?.map((item: any, index: number) => (
            <div key={index} className="w-full flex 800px:items-center py-2">
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline
                  size={20}
                  className="text-black dark:text-white"
                />
              </div>
              <p className="pl-2 text-black dark:text-white">{item.title}</p>
            </div>
          ))}

          <br />
          <br />

          <div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Course overview
            </h1>
            <CourseContentList data={data?.courseData} isDemo={true} />
          </div>

          <br />
          <br />

          <div className="w-full">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Course Details
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
              {data.description}
            </p>
          </div>

          <br />
          <br />

          {/* Ratings and Reviews Section */}
          <div className="w-full">
            <div className="flex items-center mb-6">
              <Ratings rating={data?.ratings} />
              <div className="ml-3">
                <h2 className="text-[22px] font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Rating • {data?.reviews?.length} Reviews
                </h2>
              </div>
            </div>

            {/* Reviews List */}
            <div className="w-full space-y-6">
              {data?.reviews
                ?.slice()
                .reverse()
                .slice(0, 5)
                .map((item: any, index: number) => (
                  <div
                    key={index}
                    className="pb-4 border-b dark:border-gray-700">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.user.avatar?.url || "/assets/avatar.png"}
                          width={40}
                          height={40}
                          alt="User avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex items-center">
                          <h3 className="text-[16px] font-medium text-black dark:text-white">
                            {item.user.name}
                          </h3>
                          <div className="ml-3">
                            <Ratings rating={item.rating} />
                          </div>
                        </div>
                        <p className="mt-2 text-black dark:text-white">
                          {item.comment}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {format(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full 800px:w-[35%] relative">
          <div className="sticky top-[100px] left-0 z-[50] w-full">
            <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />

            <div className="flex items-center mt-5">
              <h1 className="text-[25px] text-black dark:text-white">
                {data.price === 0 ? "Free" : `Rs. ${data.price}`}
              </h1>
              <h5 className="pl-3 line-through opacity-80 text-[20px] text-black dark:text-white">
                Rs. {data?.estimatedPrice}
              </h5>
              <h4 className="pl-5 text-[22px] text-black dark:text-white">
                {discountPercentagePrice}% off
              </h4>
            </div>

            <div className="flex items-center mt-4">
              {isPurchased ? (
                <Link
                  className={`${styles.button} !w-[180px] !border-none dark:hover:!text-white my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                  href={`/course-access/${data?._id}`}>
                  Enter Course
                </Link>
              ) : (
                <div
                  className={`${styles.button} !w-[180px] !border-none dark:hover:!text-white my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                  onClick={handleOrder}>
                  Buy Now @ Rs. {data.price}
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-black dark:text-white">
                ✓ Source code included
              </p>
              <p className="text-black dark:text-white">
                ✓ Full lifetime access
              </p>
              <p className="text-black dark:text-white">✓ Premium Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {open && (
        <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
            <div className="w-full flex justify-end">
              <IoCloseOutline
                size={40}
                className="text-black cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm setOpen={setOpen} data={data} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
