import Joi from 'joi';
import type { IProduct } from 'db/models/product';

export const addProductSchema = Joi.object<IProduct>({
  barcode: Joi.string()
    .trim()
    .pattern(/^(?:\d{8}|\d{12}|\d{13})$/)
    .required()
    .messages({ '*': 'Ürünün barkod bilgisi olması gerekir!' }),
  brand: Joi.string().min(3).max(50).required().messages({
    '*': 'Ürün marka bilgisi olması gerekir!',
  }),
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({ '*': 'Ürün isim bilgisi olması gerekir!' }),
  price: Joi.number().positive().precision(2).required().messages({
    '*': 'Ürün fiyatı pozitif ve en fazla 2 ondalıklı bir sayı olması gerekir!',
  }),
  photo: Joi.string()
    .trim()
    .optional()
    .messages({ '*': 'Fotoğraf geçerli bir URL olmalıdır!' }),
})
  .required()
  .messages({ '*': 'Ürün bilgileri paylaşılmalıdır!' });
