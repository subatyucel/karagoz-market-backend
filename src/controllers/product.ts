import type { IProduct } from 'db/models/product';
import type { Request, Response } from 'express';
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from 'services/product';
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

export const getProductsController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const filters = {
    category: (req.query.category as string) || undefined,
    search: (req.query.search as string) || undefined,
    minPrice: req.query.minPrice
      ? parseFloat(req.query.minPrice as string)
      : undefined,
    maxPrice: req.query.maxPrice
      ? parseFloat(req.query.maxPrice as string)
      : undefined,
  };
  const products = await getProducts(page, limit, filters);

  res
    .status(200)
    .json(createSuccessResponse('Ürünler başarıyla getirildi', products));
};
