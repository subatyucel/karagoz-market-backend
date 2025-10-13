import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: [true, 'İsim bilgisi dolu olmalıdır.'] },
  surname: {
    type: String,
    required: [true, 'Soyisim bilgisi dolu olmalıdır.'],
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
    default: 'customer  ',
  },
});

export const User = model('User', userSchema);
