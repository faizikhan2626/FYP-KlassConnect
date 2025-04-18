/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);
  const [dragging, setDragging] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div className="w-[80%] m-auto mt-24 ">
        <form onSubmit={handleSubmit}>
          <div>
            <label className={`${styles.label}`}>Course Name</label>
            <input
              type="name"
              name=""
              required
              value={courseInfo.name}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, name: e.target.value })
              }
              id="name"
              placeholder="Course Name"
              className={`${styles.input}`}
            />
          </div>
          <br />
          <div className="mb-5">
            <label className={`${styles.label}`}>Course Description</label>
            <textarea
              cols={30}
              rows={8}
              placeholder="Write anything about Course"
              className={`${styles.input} !h-min !py-2`}
              value={courseInfo.description}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, description: e.target.value })
              }></textarea>
          </div>
          <br />
          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label className={`${styles.label}`}>Course Price</label>
              <input
                type="number"
                name=""
                required
                value={courseInfo.price}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, price: e.target.value })
                }
                id="price"
                placeholder="Rs 2000"
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[50%]">
              <label className={`${styles.label}`}>
                Estimated Price (Optional)
              </label>
              <input
                type="number"
                name=""
                value={courseInfo.estimatedPrice}
                onChange={(e: any) =>
                  setCourseInfo({
                    ...courseInfo,
                    estimatedPrice: e.target.value,
                  })
                }
                id="price"
                placeholder="Rs 5000"
                className={`${styles.input}`}
              />
            </div>
          </div>
          <br />
          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label className={`${styles.label}`} htmlFor="email">
                Course Tags
              </label>
              <input
                type="text"
                name=""
                required
                value={courseInfo.tags}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, tags: e.target.value })
                }
                id="name"
                placeholder="MERN, NEXT, tailwind css"
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[50%]">
              <label className={`${styles.label} w-[50%]`}>
                Course Categories
              </label>
              <select
                className={`${styles.input} dark:text-white dark:bg-black text-black`}
                value={courseInfo.categories || ""}
                onChange={(e) =>
                  setCourseInfo({
                    ...courseInfo,
                    categories: e.target.value,
                  })
                }>
                <option value="">Select Category</option>
                {categories.map((item: any) => (
                  <option value={item.title} key={item._id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label className={`${styles.label}`}>Course Level</label>
              <input
                type="text"
                name=""
                required
                value={courseInfo.level}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, level: e.target.value })
                }
                id="level"
                placeholder="Beginner / Intermediate / Expert"
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[50%]">
              <label className={`${styles.label}`}>Demo Url</label>
              <input
                type="text"
                name=""
                required
                value={courseInfo.demoUrl}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                }
                id="demoUrl"
                placeholder="weqas2345"
                className={`${styles.input}`}
              />
            </div>
          </div>
          <br />
          <div className="w-full">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file"
              className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                dragging ? "bg-blue-500" : "bg-transparent"
              }  `}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}>
              {courseInfo.thumbnail ? (
                <img
                  src={courseInfo.thumbnail}
                  alt="thumbnail"
                  className="w-full max-h-full object-cover"
                />
              ) : (
                <span className="text-black dark:text-white">
                  Drag and drop or click to upload thumbnail
                </span>
              )}
            </label>
          </div>
          <br />
          <div className="w-full flex justify-end items-center">
            <input
              type="submit"
              value={"Next"}
              className="hover:bg-gray-500 bg-[crimson] dark:bg-[#111C43]  hover:dark:bg-[#1b2d6e] w-full 800px:w-[180px] h-[40px]  text-center text-[#fff] rounded mt-8 cursor-pointer "
            />
          </div>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default CourseInformation;
