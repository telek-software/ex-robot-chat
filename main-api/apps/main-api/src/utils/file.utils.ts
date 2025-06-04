import { Request } from 'express';
import { File } from 'fastify-multer/lib/interfaces';
import { extname } from 'path';

interface FileMapper {
  file: File;
  req: Request;
}

type Func = (...arg: unknown[]) => void;
export const editFileName = (_: Request, file: File, callback: Func) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req: Request, file: File, callback: Func) => {
  if (!file.originalname.match(/\.(pdf|csv|odt|xml|xlsx|json|doc|docx|txt)$/)) {
    return callback(
      new Error(
        'Only [pdf|csv|odt|xml|xlsx|json|doc|docx|txt] files are allowed!',
      ),
      false,
    );
  }
  callback(null, true);
};

export const fileMapper = ({ file, req }: FileMapper) => {
  const image_url = `${req.protocol}://${req.headers.host}/${file.path}`;
  return {
    originalname: file.originalname,
    filename: file.filename,
    image_url,
  };
};
