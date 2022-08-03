import { Router } from 'express';

import postController from '../controllers/postController';
import courseController from '../controllers/courseController';
import userController from '../controllers/userController';
import userValidation from '../validations/userValidation';

const router = Router();

router.get('/posts', postController.getPosts);

// Courses
router.get('/courses', courseController.getAllCourses);
router.post('/courses', courseController.createCourse);
router.get('/courses/:courseId', courseController.getDetailCourse);
router.patch('/courses/:courseId', courseController.updateCourse);

// User
router.post('/auth/login', [ userValidation.LOGIN ], userController.login)
router.post('/auth/register', [ userValidation.REGISTER ], userController.register)

export = router;