/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.push({
      title: "New Link",
      url: "https://example.com",
    }); // Add valid data
    setCourseContentData(updateData);
  };

  const handleCollapseToggle = (index: number) => {
    const updateCollapse = [...isCollapsed];
    updateCollapse[index] = !updateCollapse[index];
    setIsCollapsed(updateCollapse);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.splice(linkIndex, 1);
    setCourseContentData(updateData);
  };

  const newContentHandler = (item: any) => {
    // Log the current item and its links for debugging
    console.log("Current Item:", item);
    console.log("Links:", item.links);

    // Validate the current item
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links.some((link: any) => link.title === "" || link.url === "") // Ensure all links are valid
    ) {
      toast.error("Please fill in all fields in the current section.");
      return; // Exit if any field in the current item is empty
    }

    // If the current item is valid, add new content
    let newVideoSection = "";
    if (courseContentData.length > 0) {
      const lastVideoSection =
        courseContentData[courseContentData.length - 1].videoSection;

      if (lastVideoSection) {
        newVideoSection = lastVideoSection;
      }
    }

    const newContent = {
      videoSection: newVideoSection,
      title: "",
      videoUrl: "",
      description: "",
      links: [{ title: "", url: "" }], // Initialize with an empty array
      suggestions: "",
    };

    setCourseContentData([...courseContentData, newContent]);
  };

  const addNewSection = () => {
    if (courseContentData.length === 0) {
      toast.error("Cannot add a new section before adding content.");
    }

    const lastSection = courseContentData[courseContentData.length - 1];

    if (
      !lastSection.title ||
      !lastSection.description ||
      !lastSection.videoUrl ||
      lastSection.links.length === 0 ||
      !lastSection.links[0].title ||
      !lastSection.links[0].url
    ) {
      toast.error("Please fill in all fields in the current section.");
    } else {
      setActiveSection(activeSection + 1);
      const newSection = {
        videoSection: `Untitled Section ${activeSection}`,
        title: "",
        videoUrl: "",
        description: "",
        links: [{ title: "", url: "" }],
        suggestions: "",
      };

      setCourseContentData([...courseContentData, newSection]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (courseContentData.length === 0) {
      toast.error("Please add at least one section before proceeding.");
      return;
    }

    const lastContent = courseContentData[courseContentData.length - 1];

    if (
      !lastContent.title ||
      !lastContent.description ||
      !lastContent.videoUrl
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setActive(active + 1);
    handleCourseSubmit();
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={(e) => e.preventDefault()}>
        {courseContentData.length === 0 && (
          <p className="text-center text-gray-500">No course content yet.</p>
        )}
        {courseContentData.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            courseContentData[index].videoSection !==
              courseContentData[index - 1].videoSection;

          return (
            <div
              key={index}
              className={`w-full bg-[#cdc8c817] p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}>
              {showSectionInput && (
                <div className="flex items-center">
                  <input
                    type="text"
                    className="text-[20px] font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none"
                    value={item.videoSection}
                    onChange={(e) => {
                      const updateData = [...courseContentData];
                      updateData[index].videoSection = e.target.value;
                      setCourseContentData(updateData);
                    }}
                  />
                </div>
              )}

              <br />

              <div className="flex w-full items-center justify-between">
                {isCollapsed[index] ? (
                  item.title && (
                    <p className="font-Poppins dark:text-white text-black">
                      {index + 1}. {item.title}
                    </p>
                  )
                ) : (
                  <div></div>
                )}
                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] mr-2 text-black ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updateData = [...courseContentData];
                        updateData.splice(index, 1);
                        setCourseContentData(updateData);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize={"large"}
                    className="dark:text-white text-black"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => {
                      handleCollapseToggle(index);
                    }}
                  />
                </div>
              </div>

              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <label className={`${styles.label}`}>Video Title</label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      value={item.title}
                      placeholder="Project Title"
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].title = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>

                  <div className="my-3">
                    <label className={`${styles.label}`}>Video URL</label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      value={item.videoUrl}
                      placeholder="Video Link"
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].videoUrl = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label className={`${styles.label}`}>
                      Video Length (in minutes)
                    </label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      value={item.videoLength}
                      placeholder="Video Length"
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].videoLength = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>

                  <div className="my-3">
                    <label className={`${styles.label}`}>
                      Video Description
                    </label>
                    <textarea
                      rows={4}
                      className={`${styles.input} !h-min py-2`}
                      value={item.description}
                      placeholder="Video Description"
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].description = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>

                  {item.links.map((link: any, linkIndex: number) => (
                    <div key={linkIndex} className="my-3">
                      <label className={`${styles.label}`}>
                        Link {linkIndex + 1}
                      </label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        value={link.title}
                        placeholder="Link Title"
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].links[linkIndex].title =
                            e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                      <input
                        type="text"
                        className={`${styles.input} mt-2`}
                        value={link.url}
                        placeholder="Link URL"
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].links[linkIndex].url =
                            e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                      <button
                        type="button"
                        className="text-red-500 mt-2"
                        onClick={() => handleRemoveLink(index, linkIndex)}>
                        Remove Link
                      </button>
                    </div>
                  ))}

                  <div className="inline-block">
                    <p
                      className="flex items-center text-[18px] dark:text-white cursor-pointer text-black"
                      onClick={() => handleAddLink(index)}>
                      <BsLink45Deg className="mr-2" />
                      Add Link
                    </p>
                  </div>
                </>
              )}

              {index === courseContentData.length - 1 && (
                <div>
                  <p
                    className="flex items-center text-[18px] dark:text-white cursor-pointer text-black"
                    onClick={() => newContentHandler(item)}>
                    <AiOutlinePlusCircle className="mr-2" />
                    Add New Content
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}>
          <AiOutlinePlusCircle className="mr-2" />
          Add new Section
        </div>
      </form>
      <br />
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
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
