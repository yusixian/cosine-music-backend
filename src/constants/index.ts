import 'dotenv/config';

export const JWT_SECRET = process.env?.JWT_SECRET ?? 'jwt_secret_key_9H3CU4!W';

export const ACCESS_KEY = process.env?.QINIU_ACCESS_KEY;
export const SECRET_KEY = process.env?.QINIU_SECRET_KEY;
export const BUCKET_NAME = process.env?.QINIU_BUCKET_NAME;
export const QINIU_ORIGIN = process.env?.QINIU_ORIGIN;
