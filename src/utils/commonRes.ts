// utils/commonRes.ts
// 按自己需要删改

import { Response } from 'express';
import { Code, codeType, CodeMessage } from '../constants/code';
import logger from './logger';

interface ResType {
  code: number;
  result: unknown;
  message?: unknown;
}
interface ResOption {
  type?: codeType;
  status?: number;
  message?: unknown;
}

// 默认成功响应
function commonRes(res: Response, result: unknown, options?: ResOption) {
  options = Object.assign({ type: Code[2000] }, options || {}); // 默认 success

  const { type, status, message } = options;
  let resStatus = status;

  if (resStatus === undefined) {
    // 根据状态设置状态码
    resStatus = type === Code[2000] ? 200 : 409;
  }

  // 响应参数
  const sendRes: ResType = {
    code: Code[type as codeType],
    result,
  };
  // 响应描述
  message && (sendRes.message = message);

  return res.status(resStatus).send(sendRes);
}

// 错误响应
commonRes.error = function (res: Response, result: unknown, message?: unknown, status?: number) {
  logger.error(message || CodeMessage['error']);
  this(res, result, { type: 'error', message: message || CodeMessage['error'], status: status || 409 });
};

// 无权限响应
commonRes.denied = function (res: Response, result: unknown) {
  this(res, result, { type: 'denied', message: CodeMessage['denied'], status: 401 });
};

export default commonRes;
