import createHttpError from 'http-errors';
import { type IUser, type IUserDocument, User } from 'db/models/user';
import bcrypt from 'bcrypt';

export const registerUser = async (payload: IUser): Promise<IUserDocument> => {
  const { firstName, lastName, email, password } = payload;

  const user = await User.findOne({ email });
  if (user) throw createHttpError(409, 'Bu email adresi kullanımda!');

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
};
