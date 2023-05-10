import { Router } from 'express';
import musicController from '../controller/music.controller';
import { adminVerify } from '../middleware/user.middleware';
import { upload } from '../middleware/upload';
const router = Router();

router.post('/upload/file', adminVerify, upload.single('file'), musicController.uploadFile);

export default router;
