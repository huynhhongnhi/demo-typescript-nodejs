import { Request, Response, NextFunction } from 'express';
import { courseService } from '../services/courseService';
import responseJson from "../commons/responseJson";

class CourseController {

    // list
    public async getAllCourses(req: Request, res: Response) {
        await courseService.getAllCourse().then((courses) => {
            return responseJson.success(200, courses, res);
        }).catch((err) => {
            return responseJson.error(500, err.message, err, res);
        });
    }

    // create
    public async createCourse(req: Request, res: Response) {
        courseService.createCourse(req.body).then((newCourse) => {
            return responseJson.success(200, newCourse, res);
        }).catch((err) => {
            return responseJson.error(500, err.message, err, res);
        });
    };

    // detail
    public async getDetailCourse(req: Request, res: Response) {
        const id: string = req.params.courseId;
        courseService.getDetailCourse(id).then((singleCourse) => {
            return responseJson.success(200, singleCourse, res);
        }).catch((err) => {
            return responseJson.error(500, err.message, err, res);
        })
    };

    public async updateCourse(req: Request, res: Response) {
        const id = req.params.courseId;
        const params = req.body;
    
        courseService.updateCourse(id, params).then(() => {
            return responseJson.success(200, {}, res);
        }).catch((err) => {
            return responseJson.error(500, err.message, err, res);
        });
    };

}

const courseController = new CourseController();
export { courseController };
