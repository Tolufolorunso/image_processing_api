import { Request, Response } from 'express';
import path from 'path';
import checkFile from '../../utils/checkFile';
import isImageValidOrExist from '../../utils/imageValid';
import resizeImage from '../../utils/resizeImage';
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
      throw new Error(`<div>
        <h1>Query not complete</h1>
          <p>
            Filaname, height, and width are all required. url sample: http://localhost:3003/images?filename=palmtunnel&width=400&height=400
          </p>
          <div>
      <h2>Image processing API</h2>
      <h2>Links </h2>
      <h2><a href="http://localhost:3003">HomePage</a></h2>
      <h2><a href="http://localhost:3003/images?filename=palmtunnel&width=400&height=400">Resizing image</a></h2>
      <h2><a href="http://localhost:3003/images">This will result to error</a></h2>
      <h2><a href="http://localhost:3003/images?filename=palmtunne&width=400&height=400">This will result to error: invalid file or file doesn't exists</a></h2>
    </div>
        </div>`);
    }

    const thumbnailPath = path.resolve('uploads', `${width}-${height}-${filename}.jpg`);
    const isFileExist: boolean = await checkFile(`${width}-${height}-${filename}.jpg`);

    if (isFileExist) {
      return res.sendFile(thumbnailPath);
    }

    const fullPath: string = path.resolve('images', `${filename}.jpg`);
    const isValidImage: boolean = await isImageValidOrExist(`${filename}.jpg`);

    // checking if file exist or invalid file
    if (!isValidImage) {
      throw new Error(
        `
        <div>
        <div>
         <h1> File doest not exist or invalid file </h1>
        <div>
      <h2>Image processing API</h2>
      <h2>Links </h2>
      <h2><a href="http://localhost:3003">HomePage</a></h2>
      <h2><a href="http://localhost:3003/images?filename=palmtunnel&width=400&height=400">Resizing image</a></h2>
      <h2><a href="http://localhost:3003/images">This will result to error</a></h2>
      <h2><a href="http://localhost:3003/images?filename=palmtunne&width=400&height=400">This will result to error: invalid file or file doesn't exists</a></h2>
    </div>
        </>
        `,
      );
    }

    const image = await resizeImage(fullPath, width, height, thumbnailPath);

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
