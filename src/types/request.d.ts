import { Request } from 'express';

export type RequestBody<T> = Request<core.ParamsDictionary, any, T>;
