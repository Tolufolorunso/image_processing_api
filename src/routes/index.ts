import express, { Request, Response } from 'express';
import imageRoute from './image/image.routes';
import path from 'path';

const routes = express.Router();

routes.get('/', async (req: Request, res: Response) => {
  console.log(path.join(__dirname, '..', 'html', 'index.html'));
  res.status(200).send(path.join(__dirname, '..', 'html', 'index.html'));
});

routes.use('/images', imageRoute);

export default routes;
