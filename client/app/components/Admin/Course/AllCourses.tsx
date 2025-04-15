/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import {
  AiOutlineCodepenCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { useTheme } from "next-themes";
import { Bold } from "lucide-react";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Link from "next/link";
type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [open, setOpen] = useState(false);
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});
  const [courseId, setCourseId] = useState("");
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <AiOutlineEdit
                className="dark:text-white text-black mt-5 ml-2"
                size={20}
              />
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];
  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                "--DataGrid-containerBackground":
                  theme === "dark" ? "5F9EA0" : "#5F9EA0",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#EAEAEA" : "#333333",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#ffff" : "#0000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#EAEAEA" : "#333333",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #2E2E2E !important"
                    : "1px solid #DDDDDD !important",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "700 !important",
                fontSize: "14px !important",
                color: theme === "dark" ? "#F3F4F6" : "#333333",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#5F9EA0" : "#5F9EA0",
                borderBottom: "none",
              },
              "& .MuiTabPagination-root": {
                color: theme === "dark" ? "#EAEAEA" : "#333333",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column-cell": {
                color: theme === "dark" ? "#EAEAEA" : "#333333",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1A1A2E" : "#FFFFFF",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#5F9EA0" : "#5F9EA0",
                color:
                  theme === "dark"
                    ? "#F3F4F6 !important"
                    : "#333333 !important",
                borderTop:
                  theme === "dark"
                    ? "1px solid #374151 !important"
                    : "1px solid #DDDDDD !important",
              },
              "& .MuiTablePagination-root": {
                color:
                  theme === "dark"
                    ? "#F3F4F6 !important"
                    : "#333333 !important",
              },

              "& .MuiButton-root": {
                color:
                  theme === "dark"
                    ? "#F3F4F6 !important"
                    : "#333333 !important",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#EAEAEA" : "#333333",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color:
                  theme === "dark"
                    ? "#EAEAEA !important"
                    : "#333333 !important",
              },
            }}>
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 
                  bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[350px]">
                <h1 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                  Are you sure you want to delete this Course?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-6">
                  <button
                    className="w-[120px] h-[40px] bg-[#5F9EA0] text-white rounded-md"
                    onClick={() => setOpen(false)}>
                    Cancel
                  </button>
                  <button
                    className="w-[120px] h-[40px] bg-red-600 text-white rounded-md"
                    onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
