// music.controller.ts
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import musicService from '../service/music.service';
import { RequestBody } from '../types/request';
import commonRes from '../utils/commonRes';
import { upToQiniu } from '../utils/oss';
import silentHandle from '../utils/silentHandle';

class MusicController {
  /**
   * @description: 上传音乐资源（封面图/mp3）
   */
  public async uploadFile(req: Request, res: Response) {
    const [e, result] = await silentHandle(async () => {
      const file = req?.file;
      const url = await upToQiniu(file);
      return url;
    });
    return e ? commonRes.error(res, null, e.message) : commonRes(res, result, { message: '上传资源成功!' });
  }

  /**
   * @description: 添加新音乐
   */
  public async createMusic(req: RequestBody<Prisma.MusicUncheckedCreateInput>, res: Response) {
    const [e, music] = await silentHandle(musicService.createMusic, req.body);
    return e ? commonRes.error(res, null, e.message) : commonRes(res, music);
  }
  /**
   * @description: 根据ID删除音乐
   */
  public async deleteMusic(req: Request, res: Response) {
    const id = req.params.id;
    const [e, deletedMusic] = await silentHandle(musicService.deleteMusicById, id);
    return e ? commonRes.error(res, null, e.message) : commonRes(res, deletedMusic, { message: '删除成功!' });
  }

  /**
   * @description: 根据ID更新音乐信息
   */
  public async updateMusic(req: Request, res: Response) {
    const id = req.params.id;
    const [e, updatedMusic] = await silentHandle(musicService.updateMusicById, id, req.body);
    return e ? commonRes.error(res, null, e.message) : commonRes(res, updatedMusic, { message: '更新成功!' });
  }

  /**
   * @description: 根据ID查询音乐信息
   */
  public async getMusicById(req: Request, res: Response) {
    const id = req.params.id;
    const [e, music] = await silentHandle(musicService.getMusicById, id);
    return e ? commonRes.error(res, null, e.message) : commonRes(res, music);
  }

  /**
   * @description: 分页查询音乐列表
   */
  public async getMusicList(req: Request, res: Response) {
    const { pageNum = '1', pageSize = '10', orderBy = 'id', order = 'asc' } = req.query;
    const [e, musicList] = await silentHandle(
      musicService.getMusicList,
      parseInt(pageNum as string),
      parseInt(pageSize as string),
      orderBy as string,
      order as string,
    );
    return e ? commonRes.error(res, null, e.message) : commonRes(res, musicList);
  }
}

const musicController = new MusicController();
export default musicController;
