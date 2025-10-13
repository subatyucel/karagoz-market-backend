import { getEnv } from 'utils/getEnv';
import mongoose from 'mongoose';

export const initMongoDB = async () => {
  try {
    const user = getEnv('MONGODB_USER');
    const pwd = getEnv('MONGODB_PASSWORD');
    const url = getEnv('MONGODB_URL');
    const db = getEnv('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=karagoz-market`,
    );
    console.log('Mongo connection is successful!');
  } catch (error) {
    console.log('An error occured while connection MongoDB ', error);
    throw error;
  }
};
