import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
              url: "update-user-profile-picture",
              method: "PUT",
              body: JSON.stringify({ avatar }),
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include" as const,
            }),
          }),
          
          editProfile: builder.mutation({
            query: ({ name }) => ({
              url: "update-user-info",
              method: "PUT",
              body: { name },
              credentials: "include" as const,
            }),
          }),
          updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
              url: "update-user-password",
              method: "PUT",
              body: { oldPassword, newPassword }, 
              credentials: "include" as const,
            }),
          }),
          getAllUsers:builder.query({
            query:()=>({
              url:"get-users",
              method:"GET",
              credentials:"include" as const,
            })
          }),
          deleteUser: builder.mutation({
            query:(id)=>({
                url:`delete-user/${id}`,
                method:"DELETE",
                credentials:"include" as const
            })
        }),
        updateUserRole: builder.mutation({
          query: ({ id, role }) => ({
              url: "update-user-role",
              method: "PUT",
              body: { id, role },
              credentials: "include" as const,
          })
        }), 
    })
})

export const {useUpdateAvatarMutation,useEditProfileMutation,useUpdatePasswordMutation,useGetAllUsersQuery,useDeleteUserMutation,useUpdateUserRoleMutation } = userApi