// tag.schema.ts
// 接口参数校验 主要使用zod，具体使用可查看文档 https://zod.dev/
import z from 'zod';

// 创建接口
export const createTagSchema = z.object({
  body: z.object({
    name: z.string(),
    color: z.string().optional(),
    icon: z.string().optional(),
  }),
});
