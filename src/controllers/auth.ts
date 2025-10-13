import { registerUser } from 'services/auth';
import type { Request, Response } from 'express';

export const registerUserController = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: 'Baraşıyla kayıt olundu!',
    user,
  });
};
