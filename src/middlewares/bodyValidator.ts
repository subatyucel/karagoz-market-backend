import createHttpError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';
import type Joi from 'joi';

export const bodyValidator =
  (schema: Joi.Schema) =>
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (e: any) {
      const error = createHttpError(400, e.message);
      next(error);
    }
  };
