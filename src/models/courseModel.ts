import { Schema, model } from 'mongoose';

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
    { timestamps: true }
);

// Create course model
const Course = model('Course', courseSchema);

export default Course;