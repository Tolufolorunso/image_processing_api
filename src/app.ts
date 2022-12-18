import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import routes from './routes';

const app: Express = express();

const PORT = process.env.PORT;

app.use('/api/v1', routes);

app.listen(PORT, function () {
  console.log('server started');
});

export default app;
