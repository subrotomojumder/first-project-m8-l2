/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from 'express';

/* eslint-disable @typescript-eslint/no-unused-vars */
const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = error.message || 'Something went wrong!';
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export default globalErrorHandler;