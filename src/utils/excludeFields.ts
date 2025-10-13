import { Document } from 'mongoose';

export const excludeFields = (
  _: Document,
  ret: Record<string, any>,
  fields?: string[],
) => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;
  if (fields) fields.forEach((field) => delete ret[field]);

  return ret;
};
