import { Request, Response, NextFunction } from 'express';
import path from 'path';
import checkFile from '../../utils/checkFile';
import isImageValidOrExist from '../../utils/imageValid';
import resizeImage from '../../utils/resizeImage';
import { CustomError } from '../../middleware/globalErrorHandler';
// import checkFile from '../../../utils/checkFile';
// import isImageValidOrExist from '../../../utils/imageValid';

interface Query {
  filename?: string;
  width?: string;
  height?: string;
}

async function processImage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { filename, width, height }: Query = req.query;

    if (!filename) {
      return next(
        new CustomError(
          400,
          'Supply filename in the query parameter.  e.g.: `http://localhost:3003/images?filename=fjord&width=200&height=200`',
        ),
      );
    }

    if (!width || !height) {
      return next(
        new CustomError(
          400,
          'Supply both width and height in the query parameter.  e.g.: `http://localhost:3003/images?filename=fjord&width=200&height=200`',
        ),
      );
    }

    const userWidth: number = parseInt(width);
    const userHeight: number = parseInt(height);

    if (isNaN(userHeight) || isNaN(userWidth)) {
      return next(
        new CustomError(
          400,
          'Width and Height must be a numeric value. EG. http://localhost:3003/images?filename=fjord&width=200&height=200',
        ),
      );
    }

    if (userHeight < 1 || userWidth < 1) {
      return next(
        new CustomError(
          400,
          'Width and Height must be greater than zero EG. http://localhost:3003/images?filename=fjord&width=200&height=200',
        ),
      );
    }

    const thumbnailPath = path.resolve('uploads', `${userWidth}-${userHeight}-${filename}.jpg`);
    const isFileExist: boolean = await checkFile(`${userWidth}-${userHeight}-${filename}.jpg`);

    if (isFileExist) {
      return res.sendFile(thumbnailPath);
    }

    const fullPath: string = path.resolve('images', `${filename}.jpg`);
    const isValidImage: boolean = await isImageValidOrExist(`${filename}.jpg`);

    // checking if file exist or invalid file
    if (!isValidImage) {
      return next(new CustomError(400, 'File doest not exist or invalid file'));
    }

    const image = await resizeImage(fullPath, userWidth, userHeight, thumbnailPath);

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
