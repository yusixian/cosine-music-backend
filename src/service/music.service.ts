import { Music, Prisma, PrismaClient } from '@prisma/client';
import logger from '../utils/logger';
import { Order, PaginatedData } from '../constants/type';

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
      include: { tags: true },
    });
  }

  async updateMusicById(id: number, data: Prisma.MusicUpdateInput): Promise<Music> {
    logger.info('Updating music', id, data);
    return await prisma.music.update({
      where: { id },
      data,
    });
  }

  async updateMusicStatus(musicIds: number[], status: number) {
    await prisma.music.updateMany({
      where: {
        id: {
          in: musicIds,
        },
      },
      data: {
        status,
      },
    });
    logger.info('updateMusicStatus', { musicIds, status });
  }

  async incMusicPlayCount(id: number) {
    await prisma.music.update({
      where: { id },
      data: { playCount: { increment: 1 } },
    });
    return;
  }

  async deleteMusicById(id: number): Promise<Music> {
    return await prisma.music.delete({
      where: { id },
    });
  }

  /**
   * 通过id数组批量删除音乐
   * @param musicIds number[] id数组
   * @param force boolean 为true则为硬删除，否则为软删除，将deletedAt设置为当前时间
   */
  async deleteBatchMusicById(musicIds: number[], force?: boolean) {
    const now = new Date();
    const res = force
      ? await prisma.music.deleteMany({
          where: {
            id: {
              in: musicIds,
            },
          },
        })
      : await prisma.music.updateMany({
          where: {
            id: {
              in: musicIds,
            },
          },
          data: {
            deletedAt: now,
          },
        });
    logger.info('deleteBatchMusicById', { musicIds, force, res });
  }

  /**
   * Prisma 分页查询
   * https://www.prisma.io/docs/concepts/components/prisma-client/pagination
   * @param pageNum default 1
   * @param pageSize default 10
   * @returns Promise<Music[]>
   */
  async getMusicList(
    pageNum: number,
    pageSize: number,
    orderBy: string,
    order: Order,
    whereOpt?: Prisma.MusicWhereInput,
  ): Promise<PaginatedData<Music>> {
    const skip = (pageNum - 1) * pageSize;
    const take = pageSize;

    const orderByOption = {
      [orderBy]: order,
    } as Prisma.MusicOrderByWithAggregationInput;

    const list = await prisma.music.findMany({
      where: whereOpt,
      skip,
      take,
      orderBy: orderByOption,
      include: { tags: true },
    });
    const total = await prisma.music.count({
      where: whereOpt,
    });
    return {
      list,
      total: total,
      totalPages: Math.ceil(total / pageSize),
      pageNum,
      pageSize,
    };
  }
}
const musicService = new MusicService();
export default musicService;
