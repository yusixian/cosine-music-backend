// banner.controller.ts
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestBody } from '../types/request';
import commonRes from '../utils/commonRes';
import silentHandle from '../utils/silentHandle';
import bannerService from '../service/banner.service';

class BannerController {
  /**
   * @description: 添加新轮播图
   */
  public async createBanner(req: RequestBody<Prisma.BannerCreateInput>, res: Response) {
    const [e, banner] = await silentHandle(bannerService.createBanner, req.body);
    return e ? commonRes.error(res, null, e.message) : commonRes(res, banner, { message: '添加新轮播图成功！' });
  }

  /**
   * @description: 根据ID批量删除轮播图
   */
  public async deleteBatchBanner(req: Request, res: Response) {
    const { bannerIds } = req.body;
    const [e, deletedBanner] = await silentHandle(bannerService.deleteBatchBanner, bannerIds);
    return e ? commonRes.error(res, null, e.message) : commonRes(res, deletedBanner, { message: '删除成功!' });
  }

  /**
   * @description: 根据ID更新轮播图信息
   */
  public async updateBanner(req: Request, res: Response) {
    const id = req.params.id;
    const [e, updatedBanner] = await silentHandle(() => {
      bannerService.updateBannerById(parseInt(id), req.body);
    });
    return e ? commonRes.error(res, null, e.message) : commonRes(res, updatedBanner, { message: '更新轮播图信息成功!' });
  }

  /**
   * @description: 根据ID查询轮播图信息
   */
  public async getBannerById(req: Request, res: Response) {
    const id = req.params.id;
    const [e, banner] = await silentHandle(() => {
      return bannerService.getBannerById(parseInt(id));
    });
    return e ? commonRes.error(res, null, e.message) : commonRes(res, banner, { message: '获取轮播图详情成功!' });
  }

  /**
   * @description: 获取轮播图列表
   */
  public async getBannerList(req: Request, res: Response) {
    const { pageNum = '1', pageSize = '10', orderBy = 'id', order = 'asc' } = req.query;
    const [e, bannerList] = await silentHandle(
      bannerService.getBannerList,
      parseInt(pageNum as string),
      parseInt(pageSize as string),
      orderBy as string,
      order as string,
    );
    return e ? commonRes.error(res, null, e.message) : commonRes(res, bannerList);
  }
}

const bannerController = new BannerController();
export default bannerController;
