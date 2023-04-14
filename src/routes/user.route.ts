import { Router } from 'express';
import validate from '../middleware/validate';
import { createUserSchema, loginSchema } from '../schema/user.schema';
import { cryptPassword, validateUniqueUser, verifyLogin } from '../middleware/user.middleware';
import userController from '../controller/user.controller';
const router = Router();

router.post('/register', validate(createUserSchema), validateUniqueUser, cryptPassword, userController.register);
router.post('/login', validate(loginSchema), verifyLogin, userController.login);

export default router;
