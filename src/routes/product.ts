import { addProductController } from 'controllers/product';
import { Router } from 'express';
import { bodyValidator } from 'middlewares/bodyValidator';
import { asyncWrapper } from 'utils/asyncWrapper';
import { addProductSchema } from 'validation/product';

const router = Router();

router.post(
  '/add',
  bodyValidator(addProductSchema),
  asyncWrapper(addProductController),
);

export default router;
