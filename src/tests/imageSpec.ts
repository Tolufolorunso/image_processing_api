import supertest from 'supertest';
import { promises as fs } from 'fs';
import path from 'path';

import app from '../app';
import add from '../index.sample';
import resizeImage from '../utils/resizeImage';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  it('should return status code 200, endpoint: "/"', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('should return status code 200 for "valid args", endpoint: "/images?filename=fjord&width=400&height=400"', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/images?filename=fjord&width=400&height=400');
    expect(response.status).toBe(200);
  });

  describe('Test for Errors with endpoints', (): void => {
    it('should return status code 404 , endpoint: "/tolu', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/tolu');
      expect(response.status).toBe(404);
    });

    it('should return status code 400 for "invalid args", endpoint: "/images?filename=fjord&width=tolu&height=400"', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/images?filename=fjord&width=tolu&height=400');
      expect(response.status).toBe(400);
    });

    it('should return status code 400 if no parameters supplied, endpoint: "/images', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/images');
      expect(response.status).toBe(400);
    });
  });

  describe('Test processing image using sharp', (): void => {
    it('should return true if image is resized', async (): Promise<void> => {
      const fullPath: string = path.resolve('images', `fjord.jpg`);
      const thumbnailPath = path.resolve('uploads', `400-400-fjord.jpg`);
      const isSuccess = await resizeImage(fullPath, 400, 400, thumbnailPath);
      expect(isSuccess).toBe(true);
    });
  });

  it('should return 4', async (): Promise<void> => {
    expect(add(2, 2)).toBe(4);
  });
});

afterAll(async (): Promise<void> => {
  const thumbnailPath = path.resolve('uploads', '400-400-fjord.jpg');
  try {
    await fs.access(thumbnailPath);
    fs.unlink(thumbnailPath);
  } catch (error) {
    //nothing here
  }
});
