import { HttpError } from 'http-errors';
import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
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
    ...(err.errors && { errors: err.errors }),
    ...(isDevelopment && { stack: err.stack }),
  });
};
