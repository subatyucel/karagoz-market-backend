import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export const notFoundHandler = (_: Request, _2: Response, _3: NextFunction) => {
  throw createHttpError(404, 'Route not found!');
};
