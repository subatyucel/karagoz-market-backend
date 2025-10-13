import {
  Product,
  type IProduct,
  type IProductDocument,
} from 'db/models/product';
import createHttpError from 'http-errors';

interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  quantity?: number;
}

interface PaginationResult {
  data: IProductDocument[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const addProduct = async (
  payload: IProduct,
): Promise<IProductDocument> => {
  const { barcode } = payload;
  const product = await Product.findOne({ barcode });
  if (product)
    throw createHttpError(
      400,
      'Bu barkoda sahip bir ürün kayıtlarda mevcut! Barkod ile arama bölümünden ilgili ürün üzerinde güncelleme yapınız!',
    );

  return await Product.create(payload);
};

export const deleteProduct = async (id: string) => {
  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct)
    throw createHttpError(404, 'Bu id hiç bir ürüne ait değil');

  return deletedProduct;
};

export const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const product = Product.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );

  if (!product) throw createHttpError(404, 'Bu id hiç bir ürüne ait değil!');

  return product;
};

export const getProducts = async (
  page: number,
  limit: number,
  filters: ProductFilters = {},
): Promise<PaginationResult> => {
  const skip = (page - 1) * limit;
  const query: any = {};

  if (filters.category) query.category = filters.category;
  if (filters.search)
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { barcode: { $regex: filters.search, $options: 'i' } },
      { brand: { $regex: filters.search, $options: 'i' } },
    ];

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = filters.minPrice;
    if (filters.maxPrice) query.price.$lte = filters.maxPrice;
  }

  const total = await Product.countDocuments(query);
  const products = await Product.find(query).skip(skip).limit(limit);

  if (!products) throw createHttpError(404, 'Hiç ürün bulunamadı!');

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > totalPages;

  return {
    data: products,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage,
      hasPrevPage,
    },
  };
};
