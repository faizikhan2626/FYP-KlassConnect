/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import {
  AiOutlineCodepenCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { useTheme } from "next-themes";
import { Bold } from "lucide-react";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, error } = useGetAllCoursesQuery({});

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
            <Button>
              <AiOutlineEdit className="dark:text-white text-black" size={20} />
            </Button>
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
            <Button>
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

  const rows = [];
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
                  theme === "dark" ? "#3ccba0" : "#DC143C",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#EAEAEA" : "#333333",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#EAEAEA" : "#333333",
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
                backgroundColor: theme === "dark" ? "#1F2937" : "#F5F5F5",
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
                backgroundColor: theme === "dark" ? "#1F2937" : "#F5F5F5",
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
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
