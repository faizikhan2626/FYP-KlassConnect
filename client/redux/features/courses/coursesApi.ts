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
                url:"get-admin-courses",
                method:"GET",
                credentials:"include" as const
            })
        }),
        deleteCourse: builder.mutation({
            query:(id)=>({
                url:`delete-course/${id}`,
                method:"DELETE",
                credentials:"include" as const
            })
        }),
        editCourse: builder.mutation({
            query:({id,data})=>({
                url:`edit-course/${id}`,
                method:"PUT",
                body:data,
                credentials:"include" as const
            })
        }),
        getUsersAllCourses: builder.query({
            query:()=>({
                url:`get-all-courses`,
                method:"GET",
                credentials:"include" as const
            })
        }),
        getCourseDetails: builder.query({
            query:(id)=>({
                url:`get-course/${id}`,
                method:"GET",
                credentials:"include" as const
            })
        }),
        getCourseContent: builder.query({
            query:(id)=>({
                url:`get-course-content/${id}`,
                method:"GET",
                credentials:"include" as const
            })
        }),
        addNewQuestion: builder.mutation({
            query:({question,courseId,contentId})=>({
                url:`add-question`,
                method:"PUT",
                body:{question,courseId,contentId},
                credentials:"include" as const
            })
        }),
        addAnswerInQuestion: builder.mutation({
            query:({questionId,courseId,contentId,answer})=>({
                url:`add-answer`,
                method:"PUT",
                body:{questionId,courseId,contentId,answer},
                credentials:"include" as const
            })
        }),
        addReviewInCourse: builder.mutation({
            query:({review, rating,courseId}:any)=>({
                url:`add-review/${courseId}`,
                method:"PUT",
                body:{review, rating},
                credentials:"include" as const
            })
        }),
    }),
});


export const {useAddReviewInCourseMutation,useAddAnswerInQuestionMutation,useAddNewQuestionMutation,useCreateCourseMutation, useGetAllCoursesQuery,useDeleteCourseMutation,useEditCourseMutation,useGetUsersAllCoursesQuery,useGetCourseDetailsQuery,useGetCourseContentQuery} = courseApi
