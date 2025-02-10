import { Response } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

//create Course
export const createCourse = CatchAsyncError(async(data:any,res:Response)=>{
    const course = await (CourseModel.create(data));
    res.status(201).json({
        success:true,
        course
    })
})

//get all Courses --admin
export const getAllCoursesServices = async (res:Response)=>{
    const courses = await CourseModel.find().sort({createdAt:-1});

        res.status(201).json({
            success:true,
            courses,
        })

}