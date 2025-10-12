import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Hello World',
  });
});

export default router;
