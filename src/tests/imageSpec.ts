import supertest from 'supertest';
import { promises as fs } from 'fs';
import path from 'path';

import app from '../app';
import add from '../index.sample';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  it('should return status code 200, endpoint: "/api/v1"', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api/v1');
    expect(response.status).toBe(200);
  });

  it('should return status code 200 for "valid args", endpoint: "/api/v1/images?filename=fjord&width=400&height=400"', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api/v1/images?filename=fjord&width=400&height=400');
    expect(response.status).toBe(200);
  });

  describe('Test for Errors with endpoints', (): void => {
    it('should return status code 404 , endpoint: "/api/v1/tolu', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/v1/tolu');
      expect(response.status).toBe(404);
    });

    it('should return status code 400 for "invalid args", endpoint: "/api/v1/images?filename=fjord&width=tolu&height=400"', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/v1/images?filename=fjord&width=tolu&height=400');
      expect(response.status).toBe(400);
    });

    it('should return status code 400, endpoint: "/api/v1/images', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/v1/images');
      expect(response.status).toBe(400);
    });
  });

  it('should return 4 ', async (): Promise<void> => {
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
