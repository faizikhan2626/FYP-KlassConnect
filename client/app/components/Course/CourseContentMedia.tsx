/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Ratings from "@/app/utils/Ratings";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const course = courseData?.course;
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const [
    addNewQuestion,
    { isSuccess, isLoading: questionCreationLoading, error },
  ] = useAddNewQuestionMutation();

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewIsLoading,
    },
  ] = useAddReviewInCourseMutation();

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question cannot be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully!");
    }
    if (error) {
      if (
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
      ) {
        toast.error(error.data.message);
      } else {
        console.error("Unexpected error structure:", error);
        toast.error("An error occurred while adding the question");
      }
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Reply added successfully!");
    }
    if (answerError) {
      if (
        "data" in answerError &&
        answerError.data &&
        typeof answerError.data === "object" &&
        "message" in answerError.data
      ) {
        toast.error(answerError.data.message);
      } else {
        console.error("Unexpected answerError structure:", answerError);
        toast.error("An error occurred while adding the reply");
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review added successfully!");
    }
    if (reviewError) {
      if (
        "data" in reviewError &&
        reviewError.data &&
        typeof reviewError.data === "object" &&
        "message" in reviewError.data
      ) {
        toast.error(reviewError.data.message);
      } else {
        console.error("Unexpected reviewError structure:", reviewError);
        toast.error("An error occurred while adding the review");
      }
    }
  }, [
    isSuccess,
    reviewError,
    reviewSuccess,
    error,
    answerSuccess,
    answerError,
  ]);

  const handleAnswerSubmit = async (answer: string, questionId: string) => {
    if (answer.length === 0) {
      toast.error("Answer cannot be empty");
    } else {
      addAnswerInQuestion({
        answer,
        courseId: id,
        contentId: data[activeVideo]._id,
        questionId,
      });
    }
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review cannot be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  console.log(course);

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } ml-20 !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }>
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } mr-40 !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }>
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600]">{data[activeVideo].title}</h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={text} // Changed to use text instead of index
            className={`800px:text-[20px] font-[600] cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}>
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any) => (
            <div className="mb-5" key={item._id}>
              <h2 className="800px:text-[20px] 800px:inline-block">
                {item.title && `${item.title}:`}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2">
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar?.url || "/assets/avatar.png"}
              width={50}
              height={50}
              alt="User avatar"
              className="mt-1 w-[50px] h-[50px] object-cover rounded-full"
              style={{ width: "50px", height: "50px" }}
            />
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              placeholder="Write your queries..."
              className="outline-none bg-transparent ml-3 border-[1px] border-[#a79898cb] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}>
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <CommentReply
            data={data}
            activeVideo={activeVideo}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
            answerCreationLoading={answerCreationLoading}
          />
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          {!isReviewExists && (
            <>
              <div className="w-full flex">
                <Image
                  src={user.avatar?.url || "/assets/avatar.png"}
                  width={50}
                  height={50}
                  alt="User avatar"
                  className="mt-1 w-[50px] h-[50px] object-cover rounded-full"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="w-full">
                  <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                    Give a Rating <span className="text-red-500">*</span>
                  </h5>
                  <div className="flex w-full ml-2 pb-3">
                    {[1, 2, 3, 4, 5].map((i) =>
                      rating >= i ? (
                        <AiFillStar
                          key={`star-${i}`}
                          className="cursor-pointer"
                          color="rgb(246,186,0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={`star-outline-${i}`}
                          className="cursor-pointer"
                          color="rgb(246,186,0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    cols={40}
                    rows={5}
                    placeholder="Leave a Review..."
                    className="outline-none bg-transparent ml-3 border-[1px] border-[#a79898cb] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"></textarea>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div
                  className={`${
                    styles.button
                  } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                    reviewIsLoading && "cursor-not-allowed"
                  }`}
                  onClick={reviewIsLoading ? () => {} : handleReviewSubmit}>
                  Submit
                </div>
              </div>
            </>
          )}
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b] "></div>
          <div className="w-full">
            {(course?.reviews && [...course.reviews].reverse())?.map(
              (item: any, index: number) => (
                <div className="w-full my-5" key={index}>
                  <div className="w-full flex">
                    <div>
                      <Image
                        src={item.user.avatar?.url || "/assets/avatar.png"}
                        width={50}
                        height={50}
                        alt="Reply avatar"
                        className="w-[50px] h-[50px] object-cover rounded-full"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                    <div className="ml-2">
                      <div className="flex items-center">
                        <h5 className="text-[20px] pr-1">{item.user.name}</h5>
                        {item.user.role === "admin" && (
                          <RiVerifiedBadgeFill className="text-[#497DF2]" />
                        )}
                      </div>
                      <Ratings rating={item.rating} />
                      <p>{item.comment}</p>
                      <small className="text-[#ffffff83]">
                        {format(item.createdAt)}
                      </small>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  handleAnswerSubmit,
  user,
  answerCreationLoading,
}: any) => {
  return (
    <div className="w-full my-3">
      {data[activeVideo].questions.map((item: any) => (
        <CommentItem
          key={item._id}
          item={item}
          handleAnswerSubmit={handleAnswerSubmit}
          user={user}
          answerCreationLoading={answerCreationLoading}
        />
      ))}
    </div>
  );
};

const CommentItem = ({
  item,
  handleAnswerSubmit,
  user,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleLocalSubmit = () => {
    handleAnswerSubmit(answer, item._id);
    setAnswer("");
  };

  return (
    <div className="my-4">
      <div className="flex mb-2">
        <div>
          <Image
            src={item.user.avatar?.url || "/assets/avatar.png"}
            width={50}
            height={50}
            alt="Avatar"
            className="w-[50px] h-[50px] object-cover rounded-full"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <div className="pl-3">
          <div className="flex items-center">
            <h5 className="text-[20px] mr-1">{item?.user.name}</h5>
            {item.user.role === "admin" && (
              <RiVerifiedBadgeFill className="text-[#497DF2]" />
            )}
          </div>
          <p>{item?.question}</p>
          <small className="text-[#000000b8] dark:text-[#ffffff83]">
            {!item.createdAt ? "" : format(item?.createdAt)}
          </small>
        </div>
      </div>
      <div className="w-full flex">
        <span
          className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2"
          onClick={() => setReplyActive(!replyActive)}>
          {!replyActive
            ? item.questionReplies.length !== 0
              ? "All Replies"
              : "Add Reply"
            : "Hide Replies"}
        </span>
        <BiMessage
          size={20}
          className="cursor-pointer text-[#000000b8] dark:text-[#ffffff83]"
        />
        <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
          {item.questionReplies.length}
        </span>
      </div>
      {replyActive && (
        <>
          {item.questionReplies.map((reply: any) => (
            <div
              key={reply._id}
              className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
              <div>
                <Image
                  src={reply.user.avatar?.url || "/assets/avatar.png"}
                  width={50}
                  height={50}
                  alt="Reply avatar"
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className="pl-2">
                <div className="flex items-center">
                  <h5 className="text-[20px] pr-1">{reply.user.name}</h5>
                  {reply.user.role === "admin" && (
                    <RiVerifiedBadgeFill className="text-[#497DF2]" />
                  )}
                </div>
                <p>{reply.answer}</p>
                <small className="text-[#ffffff83]">
                  {format(reply.createdAt)}
                </small>
              </div>
            </div>
          ))}
          <div className="w-full flex relative">
            <input
              type="text"
              placeholder="Enter your reply..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`text-black dark:text-white block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-[#fff] p-[5px] w-[95%] ${
                answerCreationLoading ? "cursor-not-allowed" : ""
              }`}
            />
            <button
              type="submit"
              className="absolute right-0 bottom-1 text-black dark:text-white"
              onClick={handleLocalSubmit}
              disabled={answerCreationLoading}>
              Submit
            </button>
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default CourseContentMedia;
