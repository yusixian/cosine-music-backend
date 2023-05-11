import { Music, Prisma, PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

// music.service.ts
const prisma = new PrismaClient();
class MusicService {
  async createMusic(data: Prisma.MusicUncheckedCreateInput): Promise<Partial<Music>> {
    logger.info('createMusic', data);
    const { id, ...rest } = data;
    if (!id)
      return await prisma.music.create({
        data: { ...rest },
      });

    return await prisma.music.create({
      data: {
        ...rest,
        id,
      },
    });
  }

  async getMusicById(id: number): Promise<Music | null> {
    return await prisma.music.findUnique({
      where: { id },
    });
  }

  async updateMusicById(id: number, data: Prisma.MusicUpdateInput): Promise<Music> {
    return await prisma.music.update({
      where: { id },
      data,
    });
  }

  async deleteMusicById(id: number): Promise<Music> {
    return await prisma.music.delete({
      where: { id },
    });
  }
  /**
   * Prisma 分页查询
   * https://www.prisma.io/docs/concepts/components/prisma-client/pagination
   * @param pageNum default 1
   * @param pageSize default 10
   * @returns Promise<Music[]>
   */
  async getMusicList(pageNum: number, pageSize: number): Promise<Music[]> {
    const skip = (pageNum - 1) * pageSize;
    const take = pageSize;
    return await prisma.music.findMany({
      skip,
      take,
    });
  }
}
const musicService = new MusicService();
export default musicService;
