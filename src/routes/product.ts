import { addProductController } from 'controllers/product';
import { Router } from 'express';
import { asyncWrapper } from 'utils/asyncWrapper';

const router = Router();

router.post('/add', asyncWrapper(addProductController));

export default router;
