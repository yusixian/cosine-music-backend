import { Router } from 'express';
import bannerController from '../controller/banner.controller';
import { adminVerify } from '../middleware/user.middleware';
import validate from '../middleware/validate';
import { createBannerSchema } from '../schema/banner.schema';
const router = Router();

router.post('/create', adminVerify, validate(createBannerSchema), bannerController.createBanner);
router.post('/batch/delete', adminVerify, bannerController.deleteBatchBanner);
router.put('/update/:id', adminVerify, bannerController.updateBanner);
router.get('/detail/:id', adminVerify, bannerController.getBannerById);
router.get('/all', bannerController.getBannerList);

export default router;
