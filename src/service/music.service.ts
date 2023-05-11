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
}
const musicService = new MusicService();
export default musicService;
