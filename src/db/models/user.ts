import { model, Schema } from 'mongoose';
import { excludeFields } from 'utils/excludeFields';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'customer' | 'owner' | 'employee';
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'İsim bilgisi dolu olmalıdır.'],
    minLength: 3,
  },
  lastName: {
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
    minlength: [12, 'Şifre en az 12 karakter içermelidir!'],
    validate: {
      validator: function (password: string) {
        return /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password);
      },
      message: 'Şifre en az bir harf ve bir rakam içermelidir!',
    },
    select: false,
  },
  role: {
    type: String,
    enum: ['customer', 'owner', 'employee'],
    default: 'customer',
  },
});

userSchema.set('toJSON', {
  transform: (_, ret) => excludeFields(_, ret, ['password']),
});

export const User = model<IUser>('User', userSchema);
