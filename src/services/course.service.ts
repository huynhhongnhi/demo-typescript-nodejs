import courseModel from '../models/course.model';

interface CourseInterface {
    title: number,
    description: number
}


class CourseService {

    public getAllCourse() {
        return courseModel.find().select(`_id title description`);
    };

    public createCourse( { title, description }: CourseInterface) {
        const course = new courseModel({ title, description });
        const createCourse = course.save();
        return createCourse;
    };

    public getDetailCourse = (id: string) => {
        return courseModel.findById(id);
    };

    public updateCourse = (id: string, params: object) => {
        return courseModel.updateOne({ _id: id }, { $set:params });
    };

    public deleteCourse = (id: string) => {
        return courseModel.deleteOne({_id: id});
    };

}

const courseService = new CourseService();
export { courseService };