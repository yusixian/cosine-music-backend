import { Prisma, PrismaClient, Tag } from '@prisma/client';
import { Order, PaginatedData } from '../constants/type';
import logger from '../utils/logger';

// tag.service.ts
const prisma = new PrismaClient();
class TagService {
  async findTagByTagName(name: string) {
    const tag = await prisma.tag.findUnique({ where: { name } });
    return tag;
  }
  async createTag(data: Prisma.TagCreateInput): Promise<Partial<Tag>> {
    logger.info('createTag', data);
    return await prisma.tag.create({
      data,
    });
  }

  async getTagById(id: number): Promise<Tag | null> {
    return await prisma.tag.findUnique({
      where: { id },
    });
  }

  async updateTagById(id: number, data: Prisma.TagUpdateInput): Promise<Tag> {
    return await prisma.tag.update({
      where: { id },
      data,
    });
  }

  async deleteTagById(id: number): Promise<Tag> {
    return await prisma.tag.delete({
      where: { id },
    });
  }

  /**
   * 通过id数组批量删除标签
   * @param tagIds number[] id数组
   */
  async deleteBatchTag(tagIds: number[]) {
    await prisma.tag.deleteMany({
      where: {
        id: {
          in: tagIds,
        },
      },
    });
    logger.info('deleteBatchTag', { tagIds });
  }

  /**
   * Prisma 分页查询
   * https://www.prisma.io/docs/concepts/components/prisma-client/pagination
   * @param pageNum default 1
   * @param pageSize default 10
   * @returns Promise<Tag[]>
   */
  async getTagList(
    pageNum: number,
    pageSize: number,
    orderBy: string,
    order: Order,
    whereOpt?: Prisma.TagWhereInput,
  ): Promise<PaginatedData<Tag>> {
    const skip = (pageNum - 1) * pageSize;
    const take = pageSize;

    const orderByOption = {
      [orderBy]: order,
    } as Prisma.TagOrderByWithAggregationInput;

    const list = await prisma.tag.findMany({
      where: whereOpt,
      skip,
      take,
      orderBy: orderByOption,
      include: { musics: true },
    });
    const total = await prisma.tag.count({
      where: whereOpt,
    });

    logger.info('getTagList', { total, list, pageSize, pageNum });
    return {
      list,
      total: total,
      totalPages: Math.ceil(total / pageSize),
      pageNum,
      pageSize,
    };
  }
}
const tagService = new TagService();
export default tagService;
