// music.controller.ts
import { Response } from 'express';
import commonRes from '../utils/commonRes';
import { upToQiniu } from '../utils/oss';
import silentHandle from '../utils/silentHandle';

class MusicController {
  /**
   * @description: 上传音乐资源（封面图/mp3）
   */
  public async uploadFile(req: any, res: Response) {
    const [e, result] = await silentHandle(async () => {
      const file = req?.file;
      const url = await upToQiniu(file);
      return url;
    });
    return e ? commonRes.error(res, null, e.message) : commonRes(res, result, { message: '上传资源成功!' });
  }
}

const musicController = new MusicController();
export default musicController;
