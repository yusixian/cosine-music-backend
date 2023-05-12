import { Router } from 'express';
import musicController from '../controller/music.controller';
import { adminVerify, authVerify } from '../middleware/user.middleware';
import { upload } from '../middleware/upload';
import validate from '../middleware/validate';
import { createMusicSchema } from '../schema/music.schema';
import { validatePublicMusic } from '../middleware/music.middleware';
const router = Router();

router.post('/upload/file', adminVerify, upload.single('file'), musicController.uploadFile);
router.post('/create', adminVerify, validate(createMusicSchema), musicController.createMusic);
router.delete('/delete/:id', adminVerify, musicController.deleteMusic);
router.put('/update/:id', adminVerify, musicController.updateMusic);
router.put('/audit', adminVerify, musicController.updateMusicStatus);
router.put('/play/:id', authVerify, validatePublicMusic, musicController.playMusic);
router.get('/detail/:id', adminVerify, musicController.getMusicById);
router.get('/all', adminVerify, musicController.getMusicList);

export default router;
