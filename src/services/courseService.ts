import courseModel from '../models/courseModel';
import { connect } from '../configs/database';

connect();

const getAllCourse = () => {
    return courseModel.find().select(`_id title description`);
};

const createCourse = ( params ) => {
    const course = new courseModel(params);
    const createCourse = course.save();
    return createCourse;
};

const getDetailCourse = (id: String) => {
    return courseModel.findById(id);
};

const updateCourse = (id: String, params: Object) => {
    return courseModel.updateOne({ _id: id }, { $set:params });
};

const deleteCourse = (id: String) => {
    return courseModel.deleteOne({_id: id});
};

export default {
    getAllCourse,
    createCourse,
    getDetailCourse,
    updateCourse,
    deleteCourse
};