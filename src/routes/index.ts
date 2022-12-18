import express, { Request, Response } from 'express';
import imageRoute from './image/image.routes';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Homepage</h1>`);
});

routes.use('/images', imageRoute);

export default routes;
