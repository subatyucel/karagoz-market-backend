import { type Document } from 'mongoose';

export const excludeFields = <T extends Document>(
  _: T,
  ret: Record<string, any>,
  fields?: string[],
): Record<string, any> => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;
  if (fields) fields.forEach((field) => delete ret[field]);

  return ret;
};
