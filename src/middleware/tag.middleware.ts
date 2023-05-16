import { Prisma } from '@prisma/client';
import { NextFunction, Response } from 'express';
import tagService from '../service/tag.service';
import { RequestBody } from '../types/request';
import commonRes from '../utils/commonRes';

/**
 * @description: 验证标签唯一性
 */
export const validateUniqueTag = async (req: RequestBody<Prisma.TagCreateInput>, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const tag = await tagService.findTagByTagName(name);
  if (tag) commonRes.error(res, tag, '该标签已存在！');
  else next();
};
