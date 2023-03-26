// src/routes/index.ts

import { Express, Request, Response, Router } from 'express';
import commonRes from '../utils/commonRes';
import silentHandle from '../utils/silentHandle';

const getInfo = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve('info...') : reject('error...');
    }, 500);
  });
};

// 路由配置接口
interface RouterConf {
  path: string;
  router: Router;
  meta?: any;
}

// 路由配置
const routerConf: Array<RouterConf> = [];

function routes(app: Express) {
  // 根目录
  app.get('/', async (req: Request, res: Response) => {
    const [e, result] = await silentHandle(getInfo);
    e ? commonRes.error(res, null) : commonRes(res, { result });
  });

  app.post('/users/register', async (req: Request, res: Response) => {
    commonRes(res, { result: 'sssssss' });
  });
  routerConf.forEach((conf) => app.use(conf.path, conf.router));
}

export default routes;
