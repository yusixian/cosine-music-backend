import multer from 'multer';

export const upload = multer({
  dest: 'uploads/', // 指定上传文件的目录
});
