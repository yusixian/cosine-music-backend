// user.controller.ts

import { Request, Response } from 'express';
import { createUser } from '../service/user.service';
import commonRes from '../utils/commonRes';
import silentHandle from '../utils/silentHandle';

export async function createUserHandler(req: Request, res: Response) {
  const [e, user] = await silentHandle(createUser, req.body);

  return e ? commonRes.error(res, null, e.message) : commonRes(res, user);
}
