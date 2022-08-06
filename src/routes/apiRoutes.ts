import { Router } from 'express';

import { postController } from '../controllers/post.controller';
import { courseController } from '../controllers/course.controller';
import { userController } from '../controllers/user.controller';
import userValidation from '../validations/user.validation';
import authMiddleware from '../middlewares/authMiddleware';

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
router.get('/users', [ authMiddleware.isAuth ], userController.getUser)

export = router;