import type { IProduct } from 'db/models/product';
import type { Request, Response } from 'express';
import { addProduct } from 'services/product';
import { createSuccessResponse } from 'utils/createResponse';

export const addProductController = async (
  req: Request<{}, {}, IProduct>,
  res: Response,
) => {
  const product = await addProduct(req.body);

  res
    .status(201)
    .json(createSuccessResponse('Ürün başarıyla ekledi!', product));
};
