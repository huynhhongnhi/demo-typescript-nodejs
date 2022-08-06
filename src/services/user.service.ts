import * as mongoose from "mongoose";
import User from "../models/user.model";

class UserService {
    
    public createUser = (params) => {
        const user = new User(params);
        return user.save();
    };

    public getFindUser = (param) => {
        return User.findOne(param);
    };

}
  
const userService = new UserService();
export { userService };