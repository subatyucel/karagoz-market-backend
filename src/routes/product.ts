import {
  addProductController,
  deleteProductController,
} from 'controllers/product';
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

router.delete('/:id', asyncWrapper(deleteProductController));

export default router;
