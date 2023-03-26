// user.schema.ts
// 接口参数校验 主要使用zod，具体使用可查看文档 https://zod.dev/
import { object, string, TypeOf, number } from 'zod';

// 创建接口
// TODO: User Password Encryption
export const createUserSchema = object({
  body: object({
    user_name: string({ required_error: '缺少用户名' }).nonempty(),
    password: string({ required_error: '缺少用户密码' }).min(6, '密码太短 - 至少6个字符'),
    type: number().default(0), // 默认为 0，普通用户
    status: number().default(0), // 默认为 0 ，未封禁
    sex: number().default(0), // 默认为 0 ，未知
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;
