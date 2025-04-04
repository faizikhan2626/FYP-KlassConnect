import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    overrideExisting: true,  
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getAllCourses: builder.query({
            query:()=>({
                url:"get-all-courses",
                method:"GET",
                credentials:"include" as const
            })
        })
    }),
});


export const {useCreateCourseMutation, useGetAllCoursesQuery} = courseApi