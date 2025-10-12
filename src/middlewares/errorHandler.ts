import { HttpError } from 'http-errors';
import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isHttpError = err instanceof HttpError;
  const statusCode = isHttpError ? err.statusCode : 500;
  const message = isHttpError ? err.message : 'Internal Server Error';
  const isDevelopment = process.env.NODE_ENV === 'development';

  console.error(`👺[${new Date().toISOString()}] Error:`, {
    statusCode,
    message,
    path: req.path,
    method: req.method,
    stack: isDevelopment ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(isDevelopment && { stack: err.stack }),
  });
};
