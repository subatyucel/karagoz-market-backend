import { Router } from 'express';
import productRoutes from './productRoutes';
import authRoutes from './auth';

const router = Router();

router.use('/products', productRoutes);
router.use('/auth', authRoutes);

export default router;
