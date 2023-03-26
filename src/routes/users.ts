import { Router } from 'express';
import { createUserHandler } from '../controller/user.controller';
import validate from '../middleware/validate';
import { createUserSchema } from '../schema/user.schema';
const router = Router();

router.post('/create', validate(createUserSchema), createUserHandler);

export default router;
