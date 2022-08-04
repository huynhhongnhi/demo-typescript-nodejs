import * as mongoose from "mongoose";
import User from "../models/userModel";
import { connect } from '../configs/database';

connect();

const createUser = (params) => {
    try {
        const user = new User(params);
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