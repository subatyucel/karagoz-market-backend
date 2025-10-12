import dotenv from 'dotenv';

dotenv.config();

export function getEnv(name: string, defaultValue?: string) {
  const value = process.env[name];
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Couldn't find env variable ${name}`);
}
