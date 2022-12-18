import { Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';
import checkFile from '../../utils/checkFile';
import isImageValidOrExist from '../../utils/imageValid';
// import checkFile from '../../../utils/checkFile';
// import isImageValidOrExist from '../../../utils/imageValid';

interface Query {
  filename?: string;
  width?: string;
  height?: string;
}

async function processImage(req: Request, res: Response): Promise<void> {
  try {
    const { filename, width, height }: Query = req.query;
    if (!filename || !width || !height) {
      throw new Error('<h1>Query not complete</h1>');
    }

    const thumbnailPath = path.resolve('uploads', `${width}-${height}-${filename}.jpg`);
    const isFileExist: boolean = await checkFile(`${width}-${height}-${filename}.jpg`);

    if (isFileExist) {
      return res.sendFile(thumbnailPath);
    }

    const fullPath: string = path.resolve('images', `${filename}.jpg`);
    const isValidImage: boolean = await isImageValidOrExist(`${filename}.jpg`);
    if (!isValidImage) {
      throw new Error('<h1>File doest not exist or invalid</h1>');
    }
    console.log(fullPath);
    const image = await sharp(fullPath).resize(parseInt(width), parseInt(height)).toFile(thumbnailPath);
    console.log(image);
    if (image) {
      res.sendFile(thumbnailPath);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (e.message.includes('NaN')) {
        res.status(400).send('<h1>Make sure your width and height query are numbers</h1>');
      } else {
        res.status(400).send(e.message);
      } // works, `e` narrowed to Error
    } else {
      res.status(500).send('Something went wrong');
    }
  }
}

export { processImage };
