import { registerUserController } from 'controllers/auth';
import { Router } from 'express';
import { bodyValidator } from 'middlewares/bodyValidator';
import { asyncWrapper } from 'utils/asyncWrapper';
import { registerUserSchema } from 'validation/auth';

const router = Router();

router.post(
  '/register',
  bodyValidator(registerUserSchema),
  asyncWrapper(registerUserController),
);

export default router;
