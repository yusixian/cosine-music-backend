// src/routes/index.ts

import { Express, Router } from 'express';
import fs from 'fs';

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
    const path = file.slice(0, -9); // user.route.ts
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    routerConf.push({ path: `/${path}`, router: require(`./${file}`).default }); //
  }
});

function routes(app: Express) {
  routerConf.forEach((conf) => app.use(conf.path, conf.router));
}

export default routes;
