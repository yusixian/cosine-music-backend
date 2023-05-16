import { Router } from 'express';
import tagController from '../controller/tag.controller';
import { adminVerify, authVerify } from '../middleware/user.middleware';
import validate from '../middleware/validate';
import { createTagSchema } from '../schema/tag.schema';
import { validateUniqueTag } from '../middleware/tag.middleware';
const router = Router();

router.post('/create', authVerify, validate(createTagSchema), validateUniqueTag, tagController.createTag);
router.post('/batch/delete', adminVerify, tagController.deleteBatchTag);
router.put('/update/:id', adminVerify, tagController.updateTag);
router.get('/detail/:id', adminVerify, tagController.getTagById);
router.get('/all', tagController.getTagList);

export default router;
