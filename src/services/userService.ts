import User from "../models/userModel"
const mongoose = require('mongoose');

const createUser = (params) => {
    try {        
        params._id = mongoose.Types.ObjectId();

        const user = User(params);
        const createUser = user.save();
        return createUser;
    } catch (error) {
        throw error;
    }
};

const getFindUser = (param) => {
    const course = User.findOne(param);
    return course;
};
  
export default {
    createUser,
    getFindUser
};