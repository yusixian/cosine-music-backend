// music.schema.ts
// 接口参数校验 主要使用zod，具体使用可查看文档 https://zod.dev/
import z from 'zod';

// 创建接口
export const createBannerSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.string(),
    href: z.string().optional(),
    /**
		 *  description String? // 轮播图描述	
  url         String // 轮播图片路径	
  href        String? // 轮播图跳转链接
 
		 */
  }),
});
