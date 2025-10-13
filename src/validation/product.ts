import Joi from 'joi';
import type { IProduct } from 'db/models/product';

const barcodeField = Joi.string()
  .trim()
  .pattern(/^(?:\d{8}|\d{12}|\d{13})$/);

const stringMinMax = Joi.string().trim().min(3).max(50);
const priceField = Joi.number().positive().precision(2);
const quantityField = Joi.number().integer().min(0);

export const addProductSchema = Joi.object<IProduct>({
  barcode: barcodeField
    .required()
    .messages({ '*': 'Ürünün barkod bilgisi olması gerekir!' }),
  brand: stringMinMax.required().messages({
    '*': 'Ürün marka bilgisi olması gerekir!',
  }),
  name: stringMinMax
    .required()
    .messages({ '*': 'Ürün isim bilgisi olması gerekir!' }),

  price: priceField.required().messages({
    '*': 'Ürün fiyatı pozitif ve en fazla 2 ondalıklı bir sayı olması gerekir!',
  }),
  photo: Joi.string()
    .uri()
    .messages({ '*': 'Fotoğraf geçerli bir URL olmalıdır!' }),
  quantity: quantityField
    .required()
    .messages({ '*': 'Stok sayısı paylaşılmalıdır!' }),
  category: stringMinMax
    .required()
    .messages({ '*': 'Kategori bilgisi dolu olmalıdır!' }),
})
  .required()
  .messages({ '*': 'Ürün bilgileri paylaşılmalıdır!' });

export const updatedProductSchema = Joi.object({
  barcode: barcodeField,
  brand: stringMinMax,
  name: stringMinMax,
  price: priceField,
  photo: stringMinMax,
  quantity: quantityField,
})
  .min(1)
  .required()
  .messages({
    'object.min': 'En az bir alan güncellenmelidir!',
    '*': 'Güncellenecek alan bilgileri paylaşılmalıdır!',
  });
