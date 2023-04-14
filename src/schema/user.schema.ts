// user.schema.ts
// 接口参数校验 主要使用zod，具体使用可查看文档 https://zod.dev/
import z from 'zod';

// 创建接口
// TODO: User Password Encryption
export const createUserSchema = z.object({
  body: z.object({
    user_name: z.string({ required_error: '缺少用户名' }).nonempty(),
    password: z.string({ required_error: '缺少用户密码' }).min(6, '密码太短 - 至少6个字符'),
    type: z.number().default(0), // 默认为 0，普通用户
    status: z.number().default(0), // 默认为 0 ，未封禁
    sex: z.number().default(0), // 默认为 0 ，未知
    name: z.string().optional(),
    email: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    user_name: z.string(),
    password: z.string(),
  }),
});
