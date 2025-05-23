import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="m-10">
      <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
        <h1 className="text-[25px] font-[500] font-Poppins text-center py-2 dark:text-[#37a392]  text-[crimson]  800px:text-[40px]">
          Frequently Asked Questions
        </h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {questions.map((q) => (
              <div
                key={q._id}
                className={`${
                  q._id !== questions[0]?._id && "border-t "
                } border-gray-200 pt-6`}>
                <dt className="text-lg">
                  <button
                    className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(q._id)}>
                    <span className="font-medium text-black dark:text-white ">
                      <span className="text-[crimson] font-bold">
                        Question:{" "}
                      </span>
                      {q.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {q.active ? (
                        <HiMinus className="h-6 w-6 text-black dark:text-white" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-2 pr-12">
                    <p className="font-medium font-Poppins text-black dark:text-white">
                      <span className="text-[#2c2c96] font-bold">Answer: </span>{" "}
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
