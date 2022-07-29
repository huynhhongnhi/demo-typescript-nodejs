import courseModel from '../models/courseModel';
import { connect } from '../configs/database';
const mongoose = require('mongoose');

connect();

const getAllCourse = (params) => {
    const courses = courseModel.find(params).select(`_id title description`);
    return courses;
};


const createCourse = (params) => {
    try {                        
        params._id = mongoose.Types.ObjectId();
                        
        const course = new courseModel(params);
        const createCourse = course.save();
        return createCourse;
    } catch (error) {
        throw error;
    }
};

const getDetailCourse = (id: String) => {
    const course = courseModel.findById(id);
    return course;
};

const updateCourse = (id: String, params: Object) => {
    try {
        const course = courseModel.updateOne({ _id: id }, { $set:params });
        return course;
    } catch (error) {
        throw error;
    }
};

const deleteCourse = (id: String) => {
    try {
        const course = courseModel.deleteOne({_id: id});
        return course;
    } catch (error) {
        throw error;
    }
};

export default {
    getAllCourse,
    createCourse,
    getDetailCourse,
    updateCourse,
    deleteCourse
};