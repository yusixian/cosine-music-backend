import { Router } from 'express';
import validate from '../middleware/validate';
import { createUserSchema } from '../schema/user.schema';
import { cryptPassword, validateUniqueUser } from '../middleware/user.middleware';
import userController from '../controller/user.controller';
const router = Router();

router.post('/register', validate(createUserSchema), validateUniqueUser, cryptPassword, userController.createUserHandler);

export default router;
