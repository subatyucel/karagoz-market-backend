import { model, Schema } from 'mongoose';
import { excludeFields } from 'utils/excludeFields';

export interface IProduct {
  barcode: string;
  brand: string;
  name: string;
  price: number;
  photo?: string;
}

const productSchema = new Schema<IProduct>({
  barcode: {
    type: String,
    required: [true, 'Ürün barkodu olmalıdır.'],
  },
  brand: {
    type: String,
    required: [true, 'Ürün markası olmalıdır.'],
  },
  name: {
    type: String,
    required: [true, 'Ürün adı olmalıdır.'],
  },
  price: {
    type: Number,
    required: [true, 'Ürün fiyatı olmalıdır.'],
  },
  photo: {
    type: String,
    default: 'https://placehold.co/400?text=Ürün+Görseli+Bulunamadı',
  },
});

productSchema.set('toJSON', {
  transform: (_, ret) => excludeFields(_, ret),
});

export const Product = model<IProduct>('Product', productSchema);
