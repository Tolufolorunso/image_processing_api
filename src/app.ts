import dotenv from 'dotenv';
dotenv.config();

import express, { Express, NextFunction, Request, Response } from 'express';
import routes from './routes';
import { CustomError, globalErrorHandler } from './middleware/globalErrorHandler';

const app: Express = express();

const PORT = process.env.PORT || 3003;

app.use('/', routes);
app.get('*', (req: Request, _res: Response, next: NextFunction) => {
  return next(new CustomError(404, `Page not found: "${req.url}". <br>  <a href="http://localhost:3003">Go back home`));
});

app.use(globalErrorHandler);

app.listen(PORT, function () {
  console.log('server started');
});

export default app;
