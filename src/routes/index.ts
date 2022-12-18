import express, { Request, Response } from 'express';
import imageRoute from './image/image.routes';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send(
    `
    <div>
      <h1>Image processing API</h1>
      <h2>Links </h2>
      <h2><a href="http://localhost:3003">HomePage</a></h2>
      <h2><a href="http://localhost:3003/images?filename=palmtunnel&width=400&height=400">Resizing image</a></h2>
      <h2><a href="http://localhost:3003/images">This will result to error</a></h2>
      <h2><a href="http://localhost:3003/images?filename=palmtunne&width=400&height=400">This will result to error: invalid file or file doesn't exists</a></h2>
    </div>
  `,
  );
});

routes.use('/images', imageRoute);

export default routes;
