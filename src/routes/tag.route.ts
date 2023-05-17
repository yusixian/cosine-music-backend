import { Router } from 'express';
import tagController from '../controller/tag.controller';
import { validateUniqueTag } from '../middleware/tag.middleware';
import { adminVerify } from '../middleware/user.middleware';
import validate from '../middleware/validate';
import { createTagSchema } from '../schema/tag.schema';
const router = Router();

router.post('/create', adminVerify, validate(createTagSchema), validateUniqueTag, tagController.createTag);
router.post('/batch/delete', adminVerify, tagController.deleteBatchTag);
router.put('/update/:id', adminVerify, tagController.updateTag);
router.get('/detail/:id', adminVerify, tagController.getTagById);
router.get('/all', tagController.getTagList);

export default router;
