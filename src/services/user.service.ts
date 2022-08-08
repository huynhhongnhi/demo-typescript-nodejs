import User from "../models/user.model";

class UserService {
    
    public createUser(params: object) {
        const user = new User(params);
        return user.save();
    };

    public getFindUser(param: object) {
        return User.findOne(param);
    };

}
  
const userService = new UserService();
export { userService };