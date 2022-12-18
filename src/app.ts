import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import routes from './routes';

const app: Express = express();

const PORT = process.env.PORT;

app.use('/', routes);
app.get('*', (_req: Request, res: Response) => {
  res.status(404).send(`<h1>Page not found <a href="/">Go back home</a></h1>`);
});

app.listen(PORT, function () {
  console.log('server started');
});

export default app;
