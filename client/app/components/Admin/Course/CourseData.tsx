/* eslint-disable @typescript-eslint/no-explicit-any */
import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };
  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div>
      <div className="w-[80%] m-auto mt-24 block ">
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the benefits of this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            name="benefit"
            placeholder="You will be able to learn"
            key={index}
            value={benefit.title}
            onChange={(e) => {
              handleBenefitChange(index, e.target.value);
            }}
            className={`${styles.input} my-2`}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px ", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefits}
        />
      </div>
      <div className="w-[80%] m-auto mt-10 block ">
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the Pre-Requisites of this course?
        </label>
        <br />
        {prerequisites.map((prerequisites: any, index: number) => (
          <input
            type="text"
            name="prerequisites"
            placeholder="You need basic Knowledge of pre-requisites"
            key={index}
            value={prerequisites.title}
            onChange={(e) => {
              handlePrerequisitesChange(index, e.target.value);
            }}
            className={`${styles.input} my-2`}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px ", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
        />
        <div className="w-full flex items-center justify-between">
          <div
            className="hover:bg-gray-500 hover:dark:bg-[#111C43] w-full mr-2 800px:w-[180px] flex items-center justify-center h-[40px] bg-[crimson] dark:bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
            onClick={() => prevButton()}>
            Previous
          </div>
          <div
            className="hover:bg-gray-500 hover:dark:bg-[#111C43] w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[crimson] dark:bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
            onClick={() => handleOptions()}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseData;
