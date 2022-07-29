import express from 'express';
import postController from '../controllers/postController';
import courseController from '../controllers/courseController';
import userController from '../controllers/userController';
import userValidation from '../validations/userValidation';

const router = express.Router();

router.get('/posts', postController.getPosts);

// Course
router.get('/courses', courseController.getAllCourses);
router.post('/courses', courseController.createCourse);
router.get('/courses/:courseId', courseController.getDetailCourse);
router.patch('/courses/:courseId', courseController.updateCourse);


// User
router.post('/auth/login', [ userValidation.LOGIN ], userController.login)

export = router;