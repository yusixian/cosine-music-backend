# cosine-music-backend

cosine-music 的 后端，计划使用 express + prisma 试水

## 🍨 Quick Start

更改 `.env.example` 为 `.env`，并修改其中的 mysql 账号密码、数据库 配置

可在 config 中修改端口号

```bash
yarn
yarn db:init # 初始化数据库
yarn dev # 启动开发环境
```

看到 `[当前时间] INFO: App is running at http://localhost:2333` 即可

## 脚本说明

- `db:init` 开发环境下，初始化数据库
- `db:reset` 开发环境下，重置数据库数据，但保留表结构。 [Prisma Migrate in development and production](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production#reset-the-development-database)

## 🍦 TODO

项目 TODO

- [x] 初始环境搭建
- [ ] 功能设计
- [ ] 数据库设计

功能模块 TODO

- [ ] 普通用户模块
  - [ ] 注册 ing
  - [ ] 登录
  - [ ] 修改用户信息
  - [ ] 修改用户密码
- [ ] 管理员模块
  - [ ] 注册 ing
  - [ ] 登录
  - [ ] 添加其他管理员/用户
  - [ ] 修改所有用户信息
- [ ] 音乐模块
  - [ ] 查询音乐
  - [ ] 添加新音乐（管理员）
  - [ ] 删除音乐（管理员）
  - [ ] 更新音乐信息（管理员）
- [ ] 歌单模块
  - [ ] 查询歌单信息
  - [ ] 添加新歌单
  - [ ] 删除歌单（普通用户仅修改自己的）
  - [ ] 更新歌单信息（普通用户仅修改自己的）
- [ ] 标签模块
- [ ] 分区模块
  - [ ] 添加分区（自定义分区封面）
  - [ ] 删除分区
- [ ] 推荐模块
  - [ ] 随机推荐
  - [ ] 前 xxx 推荐

思考中：搜索与统计等是否单拉一个接口模块？
