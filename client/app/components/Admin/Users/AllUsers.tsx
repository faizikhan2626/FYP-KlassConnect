/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import {
  AiOutlineCodepenCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMail,
} from "react-icons/ai";
import { useTheme } from "next-themes";
import { Bold } from "lucide-react";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
type Props = {
  isTeam: boolean;
};

const AllCourses: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [open, setOpen] = useState(false);
  const [deleteUser, { isSuccess: isDeleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});
  const [updateUserRole, { isSuccess: isUpdateSuccess, error: updateError }] =
    useUpdateUserRoleMutation({});

  const [userId, setUserId] = useState("");
  const [active, setActive] = useState(false);
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.25 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.35 },
    { field: "created_at", headerName: "Joined", flex: 0.5 },
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
                setUserId(params.row.id);
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
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail
                className="dark:text-white text-black m-4"
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];
  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isDeleteSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully!");
    }
    if (deleteError) {
      if ("data" in deleteError) {
        if (
          deleteError.data &&
          typeof deleteError.data === "object" &&
          "message" in deleteError.data
        ) {
          toast.error((deleteError.data as { message: string }).message);
        }
      }
    }
  }, [isDeleteSuccess, deleteError]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("User role updated successfully!");
      refetch();
      setAddAdminOpen(false);
    }
    if (updateError) {
      toast.error("Failed to update user role");
    }
  }, [isUpdateSuccess, updateError]);

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };
  const handleRoleUpdate = async () => {
    if (!email) {
      return toast.error("Email is required");
    }
    const userToUpdate = data?.users.find((user: any) => user.email === email);
    if (!userToUpdate) return toast.error("User not found");

    await updateUserRole({ id: userToUpdate._id, role });
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="flex justify-end w-full">
              <div
                className={`${styles.button} hover:bg-[#000] h-[40px] hover:dark:text-[#5F9EA0] hover:text-[#5F9EA0] border-none bg-[#5F9EA0] !w-[220px]`}
                onClick={() => setAddAdminOpen(true)}>
                Add New Admin
              </div>
            </div>
          )}
          <Box
            m="10px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                "--DataGrid-containerBackground":
                  theme === "dark" ? "#5F9EA0" : "#5F9EA0",
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
          {/* Delete Window */}
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
          {/* Add Admin Window */}
          {addAdminOpen && (
            <Modal open={addAdminOpen} onClose={() => setAddAdminOpen(false)}>
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-opacity-70 backdrop-blur-md bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[400px]">
                <h1 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                  Update User Role
                </h1>
                <div className="mt-4">
                  <TextField
                    fullWidth
                    label="User Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{
                      style: {
                        color: theme === "dark" ? "#FFFFFF" : "#000000",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: theme === "dark" ? "#FFFFFF" : "#000000",
                      },
                    }}
                  />
                </div>
                <div className="mt-4 dark:text-white">
                  <Select
                    fullWidth
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="w-[120px] h-[40px] bg-gray-500 text-white rounded-md mr-2"
                    onClick={() => setAddAdminOpen(false)}>
                    Cancel
                  </button>
                  <button
                    className="w-[120px] h-[40px] bg-[#5F9EA0] text-white rounded-md"
                    onClick={handleRoleUpdate}>
                    Update
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
