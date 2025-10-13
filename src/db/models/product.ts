import { model, Schema, type Document } from 'mongoose';
import { excludeFields } from 'utils/excludeFields';

export interface IProduct {
  barcode: string;
  brand: string;
  name: string;
  price: number;
  quantity: number;
  photo?: string;
  category: string;
}

export interface IProductDocument extends IProduct, Document {}

const productSchema = new Schema<IProductDocument>({
  barcode: {
    type: String,
    required: [true, 'Ürün barkodu olmalıdır.'],
    unique: true,
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
  quantity: {
    type: Number,
    required: [true, 'Stok sayısı paylaşılmalıdır!'],
  },
  category: {
    type: String,
    required: [true, 'Kategori bilgisi paylaşılmalıdır!'],
  },
});

productSchema.set('toJSON', { transform: (_, ret) => excludeFields(_, ret) });

export const Product = model<IProductDocument>('Product', productSchema);
