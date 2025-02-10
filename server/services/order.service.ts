import { NextFunction ,Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel from "../models/orderModels";


//create new Order
export const newOrder = CatchAsyncError(async(data:any,res:Response,next:NextFunction)=>{
        const order = await OrderModel.create(data);
        
        res.status(201).json({
            success:true,
            order,
        })

});
   

//Get All Orders
export const getAllOrdersServices = async (res:Response)=>{
    const orders = await OrderModel.find().sort({createdAt:-1});

        res.status(201).json({
            success:true,
            orders,
        })

}