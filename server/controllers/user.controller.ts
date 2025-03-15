require('dotenv').config()
import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path"
import sendMail from "../utils/sendMail";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { getAllUsersServices, getUserById, updateUserRoleServices } from "../services/user.service";
import cloudinary from "cloudinary";

//register User
interface IRegisterationBody {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export const registrationUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler("Email Already Exists", 4000));
        }

        const user: IRegisterationBody = {
            name,
            email,
            password
        };

        //4 Digit Activation Code will be sent to User through email
        const activationToken = createActivationToken(user);

        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name }, activationCode };
        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);


        try {
            await sendMail({
                email: user.email,
                subject: "Activate Your Account",
                template: "activation-mail.ejs",
                data,
            });

            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account!`,
                activationToken: activationToken.token,
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400))
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }

});

interface IActivationToken {
    token: string;
    activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign(
        { user, activationCode },
        process.env.ACTIVATION_SECRET as Secret,
        {
            expiresIn: "5m",
        });
    return { token, activationCode }
}

//activate user
interface IActivationRequest {
    activation_token: string;
    activation_code: string;
}

export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activation_token, activation_code } = req.body as IActivationRequest;

        const newUser: { user: IUser; activationCode: string } = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as string
        ) as { user: IUser; activationCode: string };
        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler("Invalid activation code", 400));
        }

        const { name, email, password } = newUser.user;

        const existUser = await userModel.findOne({ email });

        if (existUser) {
            return next(new ErrorHandler('Email Already Exists', 400));
        }
        const user = await userModel.create({
            name,
            email,
            password

        });

        res.status(201).json({
            success: true,
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})


//Login User
interface ILoginRequest {
    email: string;
    password: string;
}

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email, password } = req.body as ILoginRequest;
        if (!email || !password) {
            return next(new ErrorHandler('Please Enter Email or Password', 400));
        };

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler('Invalid Email or Password', 400));
        };

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler('Invalid Password', 400));
        }

        sendToken(user, 200, res);


    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

//logout User


export const logoutUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        const userId = req.user?._id as string;
        await redis.del(userId);

        res.status(200).json({
            success: true,
            message: "Logged out Successfully"
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

//update access Token
export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token as string;
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;

        const message = 'Could not refresh token';
        if (!decoded) {
            return next(new ErrorHandler(message, 400));
        }
        const session = await redis.get(decoded.id as string);

        if (!session) {
            return next(new ErrorHandler("Please Login to access this resource", 400));
        }

        const user = JSON.parse(session);
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, {
            expiresIn: '5m'
        });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, {
            expiresIn: '3d'
        });
        req.user = user;

        res.cookie("access_token", accessToken, accessTokenOptions)
        res.cookie("refresh_token", refreshToken, refreshTokenOptions)

        await redis.set(user._id, JSON.stringify(user),"EX",604800);  //7 days
        next();

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})


//get user info
export const getUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id as string;
        getUserById(userId, res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

interface ISocialAuthBody {
    email: string;
    name: string;
    avatar: string;
}

//social auth
export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, avatar } = req.body as ISocialAuthBody;
        const user = await userModel.findOne({ email });
        if (!user) {
            const newUser = await userModel.create({ email, name, avatar });
            sendToken(newUser, 200, res);
        }
        else {
            sendToken(user, 200, res);
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})


//update user info
interface IUpdateUserInfo {
    email?: string;
    name?: string;
}

export const updateUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body as IUpdateUserInfo;
        const userId = req.user?._id as string;
        const user = await userModel.findById(userId);
        
        if (!user) return next(new ErrorHandler("User not found", 404));

        if (name) user.name = name;
        await user.save();

        await redis.set(userId, JSON.stringify(user));

        res.status(201).json({
            success: true,
            user,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});


//update user password
interface IUpdatePassword {
    oldPassword: string;
    newPassword: string;
}

export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body as IUpdatePassword;
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler("Please enter old and new password", 400));
        }
        const user = await userModel.findById(req.user?._id).select("+password");
        if (user?.password === undefined) {
            return next(new ErrorHandler("Invalid User", 400));
        }

        const isPasswordMatch = await user?.comparePassword(oldPassword);
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid Old Password", 400));
        }
        user.password = newPassword;
        await user.save();
        await redis.set(req.user?._id as string, JSON.stringify(user));
        res.status(201).json({
            success: true,
            user
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});


//Update Profile Picture
interface IUpdateProilePicture {
    avatar: string;
}

export const updateProfilePicture = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { avatar } = req.body;
        const userId = req?.user?._id;
        const user = await userModel.findById(userId);

        if (!avatar) {
            return res.status(400).json({ success: false, message: "Avatar is required" });
        }

        if (typeof avatar !== "string" || !avatar.startsWith("data:image")) {
            return res.status(400).json({ success: false, message: "Invalid avatar format" });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.avatar?.public_id) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        }

        // Upload the new avatar
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars", 
            width: 150
        });

        // 🔴 Update user's avatar
        user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        };

        await user.save();
        await redis.set(userId as string, JSON.stringify(user));

        res.status(200).json({
            success: true,
            user
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});


//Get all users --Admin only
export const getAllUsers = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllUsersServices(res)
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

//update User roles ---only Admin
export const updateUserRoles = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
try {
    const {id,role} = req.body;
    updateUserRoleServices(id,role,res);
} catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
    
}
})

//Delete User --Admin only
export const deleteUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if (!user) {
            return next(new ErrorHandler("User not found", 400));
        }
        await user.deleteOne({id});
        await redis.del(id);

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
    })