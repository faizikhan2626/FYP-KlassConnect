import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesServices } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose, { Mongoose } from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import axios from "axios";

//upload course
export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
        createCourse(data, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
});

//edit course
export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        const courseId = req.params.id;
        const courseData = await CourseModel.findById(courseId) as { thumbnail?: { public_id: string; url: string } };

        if (thumbnail) {
            // Case 1: New thumbnail is provided (not a Cloudinary URL)
            if (typeof thumbnail === "string" && !thumbnail.startsWith("https")) {
                // Delete old thumbnail from Cloudinary
                if (courseData?.thumbnail?.public_id) {
                    await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);
                }
                // Upload new thumbnail
                const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                    folder: "courses",
                });
                data.thumbnail = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }

            // Case 2: Thumbnail is a Cloudinary URL (keep existing data)
            if (typeof thumbnail === "string" && thumbnail.startsWith("https")) {
                data.thumbnail = {
                    public_id: (courseData?.thumbnail as { public_id: string })?.public_id,
                    url: (courseData?.thumbnail as { public_id: string; url: string })?.url,
                };
            }
        }

        // Update the course
        const course = await CourseModel.findByIdAndUpdate(
            courseId,
            { $set: data },
            { new: true }
        );

        res.status(201).json({
            success: true,
            course,
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//get single course -- without purchasing
export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const courseId = req.params.id;
        const isCacheExist = await redis.get(courseId);

        if (isCacheExist) {
            const course = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                course,
            })
        }
        else {
            const course = await CourseModel.findById(req.params.id).select(
                "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
            );

            await redis.set(courseId, JSON.stringify(course),"EX",604800); //7 Days

            res.status(200).json({
                success: true,
                course,
            })
        }


    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
});

//Get all courses --- without Purchasing

export const getAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
       
            const courses = await CourseModel.find().select(
                "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
            );
         res.status(200).json({
                success: true,
                courses,
            })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
});


//get course content --- only valid user
export const getCourseByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.user) {
            return next(new ErrorHandler("User not authenticated", 401));
          }
      
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;

        const courseExists = userCourseList?.some(
            (course: any) => course.courseId === req.params.id
          );

        if (!courseExists) {
            return next(new ErrorHandler("You are not eligible to access this course", 404));
        }

        const course = await CourseModel.findById(courseId);
        const content = course?.courseData;

        res.status(200).json({
            success: true,
            content,
        })
        

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
});

//add questions to course
interface IAddQuestionData {
    question: string;
    courseId: string;
    contentId: string;
}

export const addQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, courseId, contentId }: IAddQuestionData = req.body;
        const course = await CourseModel.findById(courseId);

        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("Invalid Content id", 400));
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

        if (!courseContent) {
            return next(new ErrorHandler("Invalid Course id", 400));
        }

        //create new question
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: []
        };

        //add this question to our course content
        courseContent.questions.push(newQuestion);

        await NotificationModel.create({
            user:req.user?._id,
            message:`You have a new question in  ${courseContent.title}`,
            title:"New Question Recieved"
        })

        //save the updated course
        await course?.save();

        res.status(200).json({
            success: true,
            course
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
});


//Answers to Questions
interface IAddAnswerData {
    answer: string;
    courseId: string;
    contentId: string;
    questionId: string;
}

export const addAnswer = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { answer, courseId, contentId, questionId }: IAddAnswerData = req.body;
        const course = await CourseModel.findById(courseId);

        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("Invalid Content id", 400));
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

        if (!courseContent) {
            return next(new ErrorHandler("Invalid Course id", 400));
        }
        const question = courseContent?.questions?.find((item: any) => item._id.equals(questionId));

        if (!question) {
            return next(new ErrorHandler("Invalid Question id", 400));
        }

        //create a new Answer
        const newAnswer: any = {
            user: req.user,
            answer,
            createdAt: new Date().toISOString(),
            updatetdAt: new Date().toISOString(),
        };

        //add this answer to our course content
        question.questionReplies?.push(newAnswer);
        await course?.save();

        
    

        if (req.user?._id === question.user._id) {
            //create a notification
            await NotificationModel.create({
                user:req.user?._id,
                message:`You have a received a reply  ${courseContent.title}`,
                title:"New Reply Recieved"
            })
        }
        else {
            const data = {
                name: question.user.name,
                title: courseContent.title,
            }
            const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"), data);
            try {
                await sendMail({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data,
                })
            } catch (error: any) {
                return next(new ErrorHandler(error.message, 500));
            }
        }
        res.status(200).json({
            success: true,
            course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//add review to course
interface IAddReviewData {

    review: string;
    rating: number;
    userId: string;

}

export const addReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses;

        const courseId = req.params.id;
        //check if courseId existsin userCourseList based on _id
        const courseExists = userCourseList?.some((course: any) => course.courseId.toString() === courseId.toString());

        if (!courseExists) {
            return next(new ErrorHandler("You are not Eligible to access this course", 404))
        }

        const course = await CourseModel.findById(courseId);
        const { review, rating } = req.body as IAddReviewData;

        const reviewData: any = {
            user: req.user,
            comment: review,
            rating,
        }

        course?.reviews.push(reviewData)

        let avg = 0;

        course?.reviews.forEach((rev: any) => {
            avg += rev.rating;
        });

        if (course) {
            course.ratings = avg / course.reviews.length;  //calculating average of total reviews
        }
        await course?.save();
        await redis.set(courseId,JSON.stringify(course),"EX",604800)  //7 days

        //create notification

        await NotificationModel.create({
            user:req.user?._id,
            title: "New Review Reveived",
            message: `${req.user?.name} has reviewed on ${course?.name}`,
        })

        res.status(200).json({
            success: true,
            course
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})


//add Reply to Reviews
interface IAddReviewData {
    comment: string;
    courseId: string;
    reviewId: string;
}

export const addReplyToReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, courseId, reviewId } = req.body as IAddReviewData;
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course Not Found", 404))
        }

        const review = course?.reviews?.find((rev: any) => rev._id.toString() === reviewId);
        if (!review) {
            return next(new ErrorHandler("Review Not Found", 404))
        }

        const replyData: any = {
            user: req.user,
            comment,
            createdAt: new Date().toISOString(),
            updatetdAt: new Date().toISOString(),
        }
        if( !review.commentReplies){
            review.commentReplies = []
        }
        review.commentReplies?.push(replyData);
        await course?.save();

        res.status(200).json({
            success: true,
            course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

//Get all courses --Admin only
export const getAdminAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllCoursesServices(res)
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

//Delete Course --Admin only
export const deleteCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const course = await CourseModel.findById(id);
        if (!course) {
            return next(new ErrorHandler("Course not found", 400));
        }
        await course.deleteOne({id});
        await redis.del(id);

        res.status(200).json({
            success: true,
            message: "Course Deleted Successfully"
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
    })

//Generate Video Url
export const generateVideoUrl = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { videoId } = req.body; 
        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            { ttl: 300 },
            {
                headers: {
                    Accept: 'application/json',
                   'Content-Type': 'application/json',
                    Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
                },
            }
        );

        res.json(response.data);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400)); 
    }
});