import { NextFunction, Request, Response } from 'express';

class CustomError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function globalErrorHandler(error: CustomError, req: Request, res: Response, _next: NextFunction) {
  // console.log(error.status, error.message);
  const status = error.status || 500;
  const message = error.message || 'something went wrong';

  res.status(status).send(
    `  <div>
        <h1>${message}</h1>
    <div>
      <h2>Image processing API</h2>
      <h2>Links </h2>
      <h2><a href="http://localhost:3003">HomePage</a></h2>
      <h2><a href="http://localhost:3003/images?filename=palmtunnel&width=400&height=400">Resizing image</a></h2>
      <h2><a href="http://localhost:3003/images">This will result to error</a></h2>
      <h2><a href="http://localhost:3003/images?filename=palmtunne&width=400&height=400">This will result to error: invalid file or file doesn't exists</a></h2>
    </div>
  </div>`,
  );
}

// export CustomError

export { globalErrorHandler, CustomError };
