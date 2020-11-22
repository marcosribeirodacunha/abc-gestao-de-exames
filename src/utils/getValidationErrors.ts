import { UnformErrors } from '@unform/core';
import { ValidationError } from 'yup';

export default function getValidationErrors(
  errors: ValidationError
): UnformErrors {
  const validationErrors: UnformErrors = {};

  errors.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
