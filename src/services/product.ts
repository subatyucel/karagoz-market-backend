import {
  Product,
  type IProduct,
  type IProductDocument,
} from 'db/models/product';
import createHttpError from 'http-errors';

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
