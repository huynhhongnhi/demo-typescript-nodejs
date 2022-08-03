import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
const saltWorkFactor = 12;

const UserSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
);

UserSchema.methods.toResources = function() {   
    return {
        _id      : this._id,
        username : this.username,
        email    : this.email,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

UserSchema.methods.comparePassword = function(_password: string) {
    return bcrypt.compareSync(_password, this.password);
}

UserSchema.pre('save', async function(next, UserSchema: any) {
    if ( !UserSchema.isModified('password') ) return next()
    try {
        const salt    = await bcrypt.genSalt(saltWorkFactor)
        UserSchema.password = await bcrypt.hash(UserSchema.password, salt)
        return next()
    } catch (err: any) {
        return next(err)
    }
})

const User = mongoose.model("users", UserSchema)

export default User;