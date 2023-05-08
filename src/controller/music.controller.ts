// music.controller.ts
import { Response } from 'express';
import commonRes from '../utils/commonRes';
import { upToQiniu } from '../utils/oss';
import silentHandle from '../utils/silentHandle';

class MusicController {
  /**
   * @description: 上传音乐封面图
   */
  public async uploadCover(req: any, res: Response) {
    const [e, result] = await silentHandle(async () => {
      const file = req?.file;
      const url = await upToQiniu(file);
      return url;
    });
    return e ? commonRes.error(res, null, e.message) : commonRes(res, result, { message: '上传图片成功!' });
  }
}

const musicController = new MusicController();
export default musicController;
