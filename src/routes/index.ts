import { Router } from 'express';
import productRoutes from './product';
import authRoutes from './auth';

const router = Router();

router.use('/products', productRoutes);
router.use('/auth', authRoutes);

export default router;
