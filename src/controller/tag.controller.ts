// tag.controller.ts
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestBody } from '../types/request';
import commonRes from '../utils/commonRes';
import silentHandle from '../utils/silentHandle';
import tagService from '../service/tag.service';

class TagController {
  /**
   * @description: 添加新标签
   */
  public async createTag(req: RequestBody<Prisma.TagCreateInput>, res: Response) {
    const [e, tag] = await silentHandle(tagService.createTag, req.body);
    return e ? commonRes.error(res, null, e.message) : commonRes(res, tag, { message: '添加新标签成功！' });
  }

  /**
   * @description: 根据ID批量删除标签
   */
  public async deleteBatchTag(req: Request, res: Response) {
    const { tagIds } = req.body;
    const [e, deletedTag] = await silentHandle(tagService.deleteBatchTag, tagIds);
    return e ? commonRes.error(res, null, e.message) : commonRes(res, deletedTag, { message: '删除成功!' });
  }

  /**
   * @description: 根据ID更新标签信息
   */
  public async updateTag(req: Request, res: Response) {
    const id = req.params.id;
    const [e, updatedTag] = await silentHandle(() => {
      tagService.updateTagById(parseInt(id), req.body);
    });
    return e ? commonRes.error(res, null, e.message) : commonRes(res, updatedTag, { message: '更新标签信息成功!' });
  }

  /**
   * @description: 根据ID查询标签信息
   */
  public async getTagById(req: Request, res: Response) {
    const id = req.params.id;
    const [e, tag] = await silentHandle(() => {
      return tagService.getTagById(parseInt(id));
    });
    return e ? commonRes.error(res, null, e.message) : commonRes(res, tag, { message: '获取标签详情成功!' });
  }

  /**
   * @description: 获取标签列表
   */
  public async getTagList(req: Request, res: Response) {
    const { pageNum = '1', pageSize = '10', orderBy = 'id', order = 'asc' } = req.query;
    const [e, tagList] = await silentHandle(
      tagService.getTagList,
      parseInt(pageNum as string),
      parseInt(pageSize as string),
      orderBy as string,
      order as string,
    );
    return e ? commonRes.error(res, null, e.message) : commonRes(res, tagList);
  }
}

const tagController = new TagController();
export default tagController;
