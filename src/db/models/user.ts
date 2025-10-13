import { model, Schema, type Document } from 'mongoose';
import { excludeFields } from 'utils/excludeFields';

export enum UserRole {
  CUSTOMER = 'customer',
  OWNER = 'owner',
  EMPLOYEE = 'employee',
}
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
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
    select: false,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.CUSTOMER,
  },
});

userSchema.set('toJSON', {
  transform: (_, ret) => excludeFields(_, ret, ['password']),
});

export const User = model<IUserDocument>('User', userSchema);
