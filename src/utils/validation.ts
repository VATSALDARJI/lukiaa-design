// utils/validationRules.js

export const nameValidation = {
  required: 'Full Name is required',
  minLength: {
    value: 2,
    message: 'Name must be at least 2 characters',
  },
};

export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Invalid email address',
  },
};

export const phoneValidation = {
  required: 'Phone number is required',
  pattern: {
    value: /^[6-9]\d{9}$/,
    message: 'Invalid phone number',
  },
};

export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters',
  },
};
