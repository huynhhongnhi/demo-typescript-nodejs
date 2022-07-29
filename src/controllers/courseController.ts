import { Request, Response, NextFunction } from 'express';
import courseService from '../services/courseService';

const getAllCourses = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

    const { search, genre } = req.query;

    try {
        const query: Object = {
            // Search query provided
            ...(search ? { $text: { $search: search || '' } } : undefined),
            // Genre query provided
            ...(genre ? { genre } : undefined)
        };

        const courses = await courseService.getAllCourse(query);

        return res.status(200).json({
            success: true,
            message: courses
        });
    } catch (e) {
        next(e)
    }
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

    courseService.updateCourse(id, params).then((newCourse) => {
        return res.status(200).json({
            success: true
        });
    }).catch((err) => {
        return res.status(500).json({
            success: false
        });
    });
}

export default { 
    getAllCourses,
    createCourse,
    getDetailCourse,
    updateCourse
}
