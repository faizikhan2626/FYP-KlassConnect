import { NextFunction, Request, response, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, {IOrder} from "../models/orderModels";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import path from "path";
import ejs, { name } from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import { getAllOrdersServices, newOrder } from "../services/order.service";


//create Order
export const createOrder = CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {courseId,payment_info  } = req.body;
    const user = await userModel.findById(req.user?._id);
    const courseExistInUser   = (user?.courses as { courseId: string }[]).some((course) => course.courseId === courseId);

    if (courseExistInUser  ) {
      return next(new ErrorHandler("You have already purchased this course", 400));
    }

    if (courseExistInUser ) {
      return next(new ErrorHandler("You have already purchased this course", 400));
    }

    const course = await CourseModel.findById(courseId);
    if(!course){
        return next(new ErrorHandler("Course not found",404));
    }

    const data:any ={
        courseId : course._id,
        userId : req.user?._id,
        payment_info
    };


    const mailData={
        order:{
            _id: course._id, 
            name: course.name,
            price: course.price,
            date: new Date().toLocaleString('en-US',{year: 'numeric', month: 'long', day: 'numeric'}),
        }
    }

    const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirmation.ejs'),{order:mailData});

    try {
        if(user){
            await sendMail({
                email:user.email,
                subject:"Order Confirmation",
                template:"order-confirmation.ejs",
                data:mailData
            });
        }
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500));
        
    }
    user?.courses.push({ courseId: course._id as string });
    await user?.save();
    const notification = await NotificationModel.create({
        user:user?._id,
        message:`You have successfully purchased ${course.name} course`,
        title:"New Order"
    })

    if (course.purchased) {
        await CourseModel.updateOne({ _id: course._id }, { $inc: { purchased: 1 } });
      } else {
        await CourseModel.updateOne({ _id: course._id }, { $set: { purchased: 1 } });
      }
   
    await course.save();
    newOrder(data,res,next);
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
        
    }
    
});

//Get all Orders --Admin only
export const getAllOrders = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllOrdersServices(res)
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})