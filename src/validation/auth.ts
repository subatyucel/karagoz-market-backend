import Joi from 'joi';

export const registerUserSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ '*': 'İsim 3-30 karakter aralığında olmalıdır!' }),
  lastName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ '*': 'Soyisim 3-30 karakter aralığında olmalıdır!' }),
  email: Joi.string()
    .email()
    .required()
    .messages({ '*': 'Geçerli bir email adresi giriniz!' }),
  password: Joi.string()
    .min(12)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .required()
    .messages({
      '*': 'Şifre en az 12 karakter olmalı ve en az 1 harf ve 1 rakam içermelidir!',
    }),
})
  .required()
  .messages({
    '*': 'İsim, Soyisim, Email ve Şifre bilgileri paylaşılmalıdır!',
  });
