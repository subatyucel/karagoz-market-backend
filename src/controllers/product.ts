import type { IProduct } from 'db/models/product';
import type { Request, Response } from 'express';
import { addProduct, deleteProduct, updateProduct } from 'services/product';
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

export const deleteProductController = async (req: Request, res: Response) => {
  const deletedProduct = await deleteProduct(req.params.id);

  res
    .status(200)
    .json(createSuccessResponse('ürün başarıyla silindi!', deletedProduct));
};

export const updateProductController = async (req: Request, res: Response) => {
  const updatedProduct = await updateProduct(req.params.id, req.body);

  res
    .status(200)
    .json(createSuccessResponse('Ürün başarıyla güncellendi!', updatedProduct));
};
