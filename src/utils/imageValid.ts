import path from 'path';
import { promises as fs } from 'fs';

async function isImageValidOrExist(filename: string): Promise<boolean> {
  const fullPath: string = path.resolve('images');
  try {
    const images = await fs.readdir(fullPath);
    return images.includes(filename);
  } catch (error) {
    throw new Error('something goes wrong');
  }
}

export default isImageValidOrExist;
