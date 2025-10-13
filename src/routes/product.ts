import {
  addProductController,
  deleteProductController,
  getProductsController,
  updateProductController,
} from 'controllers/product';
import { Router } from 'express';
import { bodyValidator } from 'middlewares/bodyValidator';
import { asyncWrapper } from 'utils/asyncWrapper';
import { addProductSchema, updatedProductSchema } from 'validation/product';

const router = Router();

router.post(
  '/add',
  bodyValidator(addProductSchema),
  asyncWrapper(addProductController),
);

router.delete('/:id', asyncWrapper(deleteProductController));
router.patch(
  '/:id',
  bodyValidator(updatedProductSchema),
  asyncWrapper(updateProductController),
);

router.get('/', asyncWrapper(getProductsController));
export default router;
