import * as mongoose from "mongoose";
import User from "../models/userModel";
import { connect } from '../configs/database';

connect();

const createUser = (params) => {
    const user = new User(params);
    return user.save();
};

const getFindUser = (param) => {
    return User.findOne(param);
};
  
export default {
    createUser,
    getFindUser
};