import type { Request, Response } from 'express';
import { addProduct } from 'services/product';

export const addProductController = async (req: Request, res: Response) => {
  const product = await addProduct(req.body);

  res.status(201).json({
    success: true,
    message: 'Ürün başarıyla eklendi!',
    product,
  });
};
