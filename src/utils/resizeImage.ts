import sharp from 'sharp';

async function resizeImage(fullPath: string, width: number, height: number, thumbnailPath: string): Promise<boolean> {
  try {
    await sharp(fullPath).resize(width, height).toFile(thumbnailPath);
    return true;
  } catch (error) {
    throw new Error('something goes wrong');
  }
}

export default resizeImage;
