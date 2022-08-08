import mongoose, { Schema, model } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description: string;
  }

// Create course schema
const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true, versionKey: false }
);

// Create course model
const Course = mongoose.model<ICourse>  ("Course", courseSchema, "courses");

export default Course;