// src/routes/index.ts

import { Express, Request, Response, Router } from 'express';
import commonRes from '../utils/commonRes';
import silentHandle from '../utils/silentHandle';
import fs from 'fs';

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

fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.ts') {
    const path = file.slice(0, -3);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    routerConf.push({ path: `/${path}`, router: require(`./${file}`).default }); //
  }
});

function routes(app: Express) {
  // 根目录
  app.get('/', async (req: Request, res: Response) => {
    const [e, result] = await silentHandle(getInfo);
    e ? commonRes.error(res, null) : commonRes(res, { result });
  });
  routerConf.forEach((conf) => app.use(conf.path, conf.router));
}

export default routes;
