import { HttpError } from 'http-errors';
import type { ErrorRequestHandler } from 'express';
import { createErrorResponse } from 'utils/createResponse';

export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
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

  res
    .status(statusCode)
    .json(
      createErrorResponse(
        message,
        err.errors,
        isDevelopment ? err.stack : undefined,
      ),
    );
};
