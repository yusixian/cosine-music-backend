import { Router } from 'express';
import userController from '../controller/user.controller';
import { authVerifyAndMountUser, cryptPassword, validateUniqueUser, verifyLogin } from '../middleware/user.middleware';
import validate from '../middleware/validate';
import { createUserSchema, loginSchema } from '../schema/user.schema';
const router = Router();

router.post('/register', validate(createUserSchema), validateUniqueUser, cryptPassword, userController.register);
router.post('/login', validate(loginSchema), verifyLogin, userController.login);
router.get('/info/byauth', authVerifyAndMountUser, userController.getInfoByAuth);

export default router;
