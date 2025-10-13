import type { ApiErrorResponse, ApiResponse } from 'types/api';

export const createSuccessResponse = <T>(
  message: string,
  data?: T,
): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const createErrorResponse = (
  message: string,
  errors?: any,
  stack?: string,
): ApiErrorResponse => ({
  success: false,
  message,
  errors,
  ...(stack && { stack }),
});
