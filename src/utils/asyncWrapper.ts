import type { RequestHandler, Request, Response, NextFunction } from 'express';

export const asyncWrapper = (controller: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
