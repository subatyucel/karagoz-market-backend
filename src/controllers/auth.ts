import { registerUser } from 'services/auth';
import type { Request, Response } from 'express';
import { IUser } from 'db/models/user';
import { createSuccessResponse } from 'utils/createResponse';

export const registerUserController = async (
  req: Request<{}, {}, IUser>,
  res: Response,
) => {
  const user = await registerUser(req.body);

  res.status(201).json(createSuccessResponse('Başarıyla kayıt olundu!', user));
};
