import { Router } from 'express';
import musicController from '../controller/music.controller';
import { adminVerify } from '../middleware/user.middleware';
import { upload } from '../middleware/upload';
import validate from '../middleware/validate';
import { createMusicSchema } from '../schema/music.schema';
const router = Router();

router.post('/upload/file', adminVerify, upload.single('file'), musicController.uploadFile);
router.post('/create', adminVerify, validate(createMusicSchema), musicController.createMusic);

export default router;
