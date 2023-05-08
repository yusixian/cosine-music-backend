// 上传到七牛
import qiniu from 'qiniu';
import fs from 'fs';
import crypto from 'crypto';
import { ACCESS_KEY, BUCKET_NAME, QINIU_ORIGIN, SECRET_KEY } from '../constants';

export const upToQiniu = (file: any, fileName?: string): Promise<string> => {
  const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
  // BUCKET_NAME 是存储空间名称
  const options = {
    scope: BUCKET_NAME,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  // 生成token 作为个人七牛云账号的识别标识
  const uploadToken = putPolicy.uploadToken(mac);
  const config: any = new qiniu.conf.Config();
  // 空间对应的机房 一定要按自己属区Zone对象
  config.zone = qiniu.zone.Zone_z2;
  const localFile = fs.createReadStream(file.path);
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const suffix = file.originalname.substring(file.originalname?.lastIndexOf('.')); // 获取后缀的点的索引
  const fName = fileName ?? crypto.createHash('md5').update(file.originalname.replace(suffix, '')).digest('hex') + suffix;

  // 文件上传
  return new Promise((resolved, reject) => {
    // 以文件流的形式进行上传
    // uploadToken是token， key是上传到七牛后保存的文件名, localFile是流文件
    // putExtra是上传的文件参数，采用源码中的默认参数
    formUploader.putStream(uploadToken, fName, localFile, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        reject(respErr);
      } else {
        resolved('http://' + QINIU_ORIGIN + '/' + respBody.key);
      }
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
          return false;
        }
      });
    });
  });
};
