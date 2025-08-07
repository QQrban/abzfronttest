import * as yup from "yup";

export function parseYupErrors(
  err: yup.ValidationError
): Record<string, string> {
  const errors: Record<string, string> = {};

  err.inner.forEach((validationError) => {
    if (validationError.path && !errors[validationError.path]) {
      errors[validationError.path] = validationError.message;
    }
  });

  return errors;
}
