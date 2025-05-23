import { Request,Response,NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/orderModels";

//Get Users Analytics --Admin only
export const getUsersAnalytics = CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const users = await generateLast12MonthsData(userModel);


        res.status(200).json({
            success:true,
            users
        });
    } catch (error:any) {
        next(new ErrorHandler(error.message,500));
    }
  
});

//Get Courses Analytics --Admin only
export const getCoursesAnalytics = CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const courses = await generateLast12MonthsData(CourseModel);


        res.status(200).json({
            success:true,
            courses
        });
    } catch (error:any) {
        next(new ErrorHandler(error.message,500));
    }
  
});

//Get Orders Analytics --Admin only
export const getOrdersAnalytics = CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const Orders = await generateLast12MonthsData(OrderModel);


        res.status(200).json({
            success:true,
            Orders
        });
    } catch (error:any) {
        next(new ErrorHandler(error.message,500));
    }
  
});