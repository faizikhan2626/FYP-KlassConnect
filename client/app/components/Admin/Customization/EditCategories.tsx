import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((category: any) =>
        category._id === id ? { ...category, title: value } : category
      )
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      //checking last category title is missing
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data?.layout?.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title} text-gray-900 dark:text-white`}>
            All Categories
          </h1>
          {categories &&
            categories.map((item: any, index: number) => {
              return (
                <div className="py-3" key={item._id || index}>
                  <div className="flex items-center w-full justify-center  gap-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[23px] font-bold bg-transparent text-gray-900 dark:text-white focus:outline-none`}
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder="Enter Category title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-gray-400 text-gray-600 text-[22px] cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition duration-200"
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer "
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${styles.button} border-none dark:hover:text-[white] !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] !rounded absolute bottom-12 right-12`}
            style={{
              cursor:
                areCategoriesUnchanged(
                  data?.layout?.categories || [],
                  categories
                ) || isAnyCategoryTitleEmpty(categories)
                  ? "not-allowed"
                  : "pointer",
              background:
                areCategoriesUnchanged(
                  data?.layout?.categories || [],
                  categories
                ) || isAnyCategoryTitleEmpty(categories)
                  ? "#cccccc34"
                  : "#42d383",
            }}
            onClick={
              areCategoriesUnchanged(
                data?.layout?.categories || [],
                categories
              ) || isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }>
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
