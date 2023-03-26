// src/app.ts

import express from 'express';
import routes from './routes'; // 路由
import logger from './utils/logger';

const app = express();

app.use(express.json());

const PORT = 1337;

// 启动
app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);
  routes(app);
});
