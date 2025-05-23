import { Response } from "express";
import userModel from "../models/user.model";
import { redis } from "../utils/redis";

//get user by id
export const getUserById = async (id:string,res:Response)=>{
    const userJson = await redis.get(id);

    if (userJson){
        const user = JSON.parse(userJson); 
        res.status(201).json({
            success:true,
            user,
        })
    };
}

//Get All users
export const getAllUsersServices = async (res:Response)=>{
    const users = await userModel.find().sort({createdAt:-1});

        res.status(201).json({
            success:true,
            users,
        })

}

//Update user role
export const updateUserRoleServices = async (id:string,role:string,res:Response)=>{
    const user = await userModel.findByIdAndUpdate(id,{role},{new:true});

    res.status(201).json({
        success:true,
        user,
    })

};