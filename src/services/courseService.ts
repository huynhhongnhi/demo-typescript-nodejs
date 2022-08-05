import courseModel from '../models/courseModel';
import { connect } from '../configs/database';

connect();

const getAllCourse = () => {
    return courseModel.find().select(`_id title description`);
};

const createCourse = ( params: object ) => {
    const course = new courseModel(params);
    const createCourse = course.save();
    return createCourse;
};

const getDetailCourse = (id: string) => {
    return courseModel.findById(id);
};

const updateCourse = (id: string, params: object) => {
    return courseModel.updateOne({ _id: id }, { $set:params });
};

const deleteCourse = (id: string) => {
    return courseModel.deleteOne({_id: id});
};

export default {
    getAllCourse,
    createCourse,
    getDetailCourse,
    updateCourse,
    deleteCourse
};