import { Prisma, PrismaClient, Banner } from '@prisma/client';
import { Order, PaginatedData } from '../constants/type';
import logger from '../utils/logger';

// banner.service.ts
const prisma = new PrismaClient();
class BannerService {
  async createBanner(data: Prisma.BannerCreateInput): Promise<Partial<Banner>> {
    logger.info('createBanner', data);
    return await prisma.banner.create({
      data,
    });
  }

  async getBannerById(id: number): Promise<Banner | null> {
    return await prisma.banner.findUnique({
      where: { id },
    });
  }

  async updateBannerById(id: number, data: Prisma.BannerUpdateInput): Promise<Banner> {
    return await prisma.banner.update({
      where: { id },
      data,
    });
  }

  async deleteBannerById(id: number): Promise<Banner> {
    return await prisma.banner.delete({
      where: { id },
    });
  }

  /**
   * 通过id数组批量删除轮播图
   * @param bannerIds number[] id数组
   */
  async deleteBatchBanner(bannerIds: number[]) {
    await prisma.banner.deleteMany({
      where: {
        id: {
          in: bannerIds,
        },
      },
    });
    logger.info('deleteBatchBanner', { bannerIds });
  }

  /**
   * Prisma 分页查询
   * https://www.prisma.io/docs/concepts/components/prisma-client/pagination
   * @param pageNum default 1
   * @param pageSize default 10
   * @returns Promise<Banner[]>
   */
  async getBannerList(
    pageNum: number,
    pageSize: number,
    orderBy: string,
    order: Order,
    whereOpt?: Prisma.BannerWhereInput,
  ): Promise<PaginatedData<Banner>> {
    const skip = (pageNum - 1) * pageSize;
    const take = pageSize;

    const orderByOption = {
      [orderBy]: order,
    } as Prisma.BannerOrderByWithAggregationInput;

    const list = await prisma.banner.findMany({
      where: whereOpt,
      skip,
      take,
      orderBy: orderByOption,
    });
    const total = await prisma.banner.count({
      where: whereOpt,
    });

    logger.info('getBannerList', { total, list, pageSize, pageNum });
    return {
      list,
      total: total,
      totalPages: Math.ceil(total / pageSize),
      pageNum,
      pageSize,
    };
  }
}
const bannerService = new BannerService();
export default bannerService;
