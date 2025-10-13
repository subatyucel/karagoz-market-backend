import createHttpError from 'http-errors';
import { User } from 'db/models/user';
import bcrypt from 'bcrypt';

interface RegisterUserPayload {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterUserPayload) => {
  const { name, surname, email, password } = payload;

  const user = await User.findOne({ email });
  if (user) throw createHttpError(409, 'Bu email adresi kullanımda!');

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    name,
    surname,
    email,
    password: hashedPassword,
  });
};
