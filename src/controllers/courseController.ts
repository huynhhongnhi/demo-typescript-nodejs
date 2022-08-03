import { Request, Response, NextFunction } from 'express';
import courseService from '../services/courseService';

const getAllCourses = async (
        req: Request,
        res: Response,
    ) => {
    await courseService.getAllCourse().then((courses) => {
        return res.status(200).json({
            success: true,
            data: courses
        })
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    });
};

const createCourse = (
    req: Request,
    res: Response
) => {
    courseService.createCourse(req.body).then((newCourse) => {
        return res.status(200).json({
            success: true,
            data: newCourse,
        });
    }).catch((err) => {
        return res.status(500).json({
            success: 500,
            error: err.message
        });
    });
};

const getDetailCourse = (req: Request, res: Response) => {
    const id: String = req.params.courseId;
    courseService.getDetailCourse(id).then((singleCourse) => {
        return res.status(200).json({
            success: true,
            data: singleCourse,
        });
    }).catch((err) => {
        return res.status(500).json({
            success: 500,
            error: err.message
        });
    })
};

const updateCourse = (req: Request, res: Response) => {
    const id = req.params.courseId;
    const params = req.body;

    courseService.updateCourse(id, params).then(() => {
        return res.status(200).json({
            success: true
        });
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    });
}

export default { 
    getAllCourses,
    createCourse,
    getDetailCourse,
    updateCourse
}
