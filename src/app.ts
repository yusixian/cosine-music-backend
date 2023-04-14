// src/app.ts
import config from 'config';
import express from 'express';
import initMiddleware from './middleware';
import routes from './routes'; // 路由
import logger from './utils/logger';
import path from 'path';
const PORT = config.get<number>('port');

const app = express();

// eslint-disable-next-line @typescript-eslint/no-var-requires
app.engine('html', require('express-art-template'));
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production',
});
app.set('views', path.join(__dirname, 'views'));
app.get('/', function (req, res) {
  res.render('index.html', {
    //模板数据如下
    name: '首页',
  });
});

// 挂载中间件
initMiddleware(app);

// 启动
app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);
  routes(app);
});
