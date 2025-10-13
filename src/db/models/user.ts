import { model, Schema } from 'mongoose';

interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  role?: 'customer' | 'owner' | 'employee';
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'İsim bilgisi dolu olmalıdır.'],
    minLength: 3,
  },
  surname: {
    type: String,
    required: [true, 'Soyisim bilgisi dolu olmalıdır.'],
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, 'Email bilgisi dolu olmalıdır..'],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Şifre bilgisi dolu olmalıdır.'],
    minlength: 12,
    select: false,
  },
  role: {
    type: String,
    enum: ['customer', 'owner', 'employee'],
    default: 'customer',
  },
});

userSchema.set('toJSON', {
  transform: (_, ret: Record<string, any>) => {
    delete ret.password;
    delete ret.__v;
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

export const User = model<IUser>('User', userSchema);
