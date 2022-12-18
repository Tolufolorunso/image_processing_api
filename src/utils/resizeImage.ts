import sharp from 'sharp';

async function resizeImage(fullPath: string, width: string, height: string, thumbnailPath: string): Promise<boolean> {
  try {
    await sharp(fullPath).resize(parseInt(width), parseInt(height)).toFile(thumbnailPath);
    return true;
  } catch (error) {
    throw new Error('something goes wrong');
  }
}

export default resizeImage;
