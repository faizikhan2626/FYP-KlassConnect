"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    if (data && usersData && coursesData) {
      const temp = data.orders.map((item: any) => {
        const user = usersData.users.find((u: any) => u._id === item.userId);
        const course = coursesData.courses.find(
          (c: any) => c._id === item.courseId
        );

        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "Rs. " + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: "emailAction",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => (
              <a href={`mailto:${params.row.userEmail}`}>
                <AiOutlineMail
                  className={isDark ? "text-white" : "text-black"}
                  size={20}
                />
              </a>
            ),
          },
        ]),
  ];

  const rows: any = [
    {
      id: "1234556777655",
      userName: "Muhammad Faizan",
      userEmail: "faizan@gmail.com",
      title: "React JS Course",
      price: "Rs. 500",
      created_at: "2 days ago",
    },
    {
      id: "1234556777655",
      userName: "Muhammad Faizan",
      userEmail: "faizan@gmail.com",
      title: "React JS Course",
      price: "Rs. 500",
      created_at: "2 days ago",
    },
    {
      id: "1234556777655",
      userName: "Muhammad Faizan",
      userEmail: "faizan@gmail.com",
      title: "React JS Course",
      price: "Rs. 500",
      created_at: "2 days ago",
    },
    {
      id: "1234556777655",
      userName: "Muhammad Faizan",
      userEmail: "faizan@gmail.com",
      title: "React JS Course",
      price: "Rs. 500",
      created_at: "2 days ago",
    },
    {
      id: "1234556777655",
      userName: "Muhammad Faizan",
      userEmail: "faizan@gmail.com",
      title: "React JS Course",
      price: "Rs. 500",
      created_at: "2 days ago",
    },
    {
      id: "1234556777655",
      userName: "Muhammad Faizan",
      userEmail: "faizan@gmail.com",
      title: "React JS Course",
      price: "Rs. 500",
      created_at: "2 days ago",
    },
  ];

  orderData?.forEach((item: any) => {
    rows.push({
      id: item._id,
      userName: item.userName,
      userEmail: item.userEmail,
      title: item.title,
      price: item.price,
      created_at: format(item.createdAt),
    });
  });

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-0"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          m="40px 0 0 0"
          height={isDashboard ? "40vh" : "90vh"}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
              "--DataGrid-containerBackground":
                theme === "dark" ? "5F9EA0" : "#5F9EA0",
            },
            "& .MuiDataGrid-row": {
              color: isDark ? "#EAEAEA" : "#333333",
              borderBottom: isDark ? "1px solid #2E2E2E" : "1px solid #DDDDDD",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
              fontSize: "14px",
              color: isDark ? "white" : "black",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#5F9EA0 !important",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: isDark ? "#1A1A2E" : "#FFFFFF",
            },
            "& .MuiDataGrid-columnHeader, & .MuiDataGrid-footerContainer": {
              borderRadius: "0px",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#5F9EA0", // SAME COLOR
              color: isDark ? "#F3F4F6" : "#333333",
              borderTop: isDark ? "1px solid #374151" : "1px solid #DDDDDD",
            },
            "& .MuiCheckbox-root": {
              color: isDark ? "#EAEAEA" : "#333333",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: isDark ? "#EAEAEA" : "#333333",
            },
          }}>
          <DataGrid
            checkboxSelection={!isDashboard}
            rows={rows}
            columns={columns}
            components={!isDashboard ? {} : { Toolbar: GridToolbar }}
          />
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
