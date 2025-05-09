import express from 'express';
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAdminAllCourses, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from '../controllers/course.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getAllOrdersServices } from '../services/order.service';
import { updateAccessToken } from '../controllers/user.controller';
const courseRouter = express.Router();

courseRouter.post("/create-course",updateAccessToken,isAuthenticated,authorizeRoles("admin"),uploadCourse)
courseRouter.put("/edit-course/:id",updateAccessToken,isAuthenticated,authorizeRoles("admin"),editCourse)
courseRouter.get("/get-course/:id",getSingleCourse)
courseRouter.get("/get-all-courses",getAllCourses)
courseRouter.get("/get-admin-courses",isAuthenticated,authorizeRoles("admin"),getAdminAllCourses)
courseRouter.get("/get-course-content/:id", updateAccessToken, isAuthenticated, getCourseByUser);
courseRouter.put("/add-question",updateAccessToken,isAuthenticated,addQuestion)
courseRouter.put("/add-answer",updateAccessToken,isAuthenticated,addAnswer)
courseRouter.put("/add-review/:id",updateAccessToken,isAuthenticated,addReview)
courseRouter.put("/add-reply",updateAccessToken,isAuthenticated,addReplyToReview,authorizeRoles("admin"))
courseRouter.put("/get-courses",updateAccessToken,isAuthenticated,getAllOrdersServices,authorizeRoles("admin"))
courseRouter.post("/getVdoCipherOTP",generateVideoUrl)
courseRouter.delete("/delete-course/:id",updateAccessToken,isAuthenticated,deleteCourse,authorizeRoles("admin"))


export default courseRouter;