import { registerUserController } from 'controllers/auth';
import { Router } from 'express';
import { asyncWrapper } from 'utils/asyncWrapper';

const router = Router();

router.post('/register', asyncWrapper(registerUserController));

export default router;
