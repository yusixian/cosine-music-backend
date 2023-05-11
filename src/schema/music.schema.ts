// music.schema.ts
// 接口参数校验 主要使用zod，具体使用可查看文档 https://zod.dev/
import z from 'zod';

// 创建接口
export const createMusicSchema = z.object({
  body: z.object({
    id: z.number().nullable().optional(),
    title: z.string({ required_error: '缺少音乐标题' }).nonempty(),
    description: z.string().optional(),
    coverUrl: z.string().optional(),
    url: z.string({ required_error: '缺少歌曲资源路径' }).nonempty(),
    foreignArtist: z.string().optional(),
    artistId: z.number().optional(),
    lyric: z.string().optional(),
    lyricAuthorId: z.number().optional(),
    tags: z.array(z.string()).optional(),
  }),
});
