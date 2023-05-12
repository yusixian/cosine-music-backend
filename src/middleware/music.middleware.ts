// TODO: verify unique Music

import { Request, Response, NextFunction } from 'express';
import commonRes from '../utils/commonRes';
import musicService from '../service/music.service';

/**
 * @description: 验证注册用户唯一性
 */
export const validatePublicMusic = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const music = await musicService.getMusicById(parseInt(id));
  if (music?.deletedAt || music?.status !== 1) commonRes.error(res, null, '音乐未公开！');
  else next();
};
