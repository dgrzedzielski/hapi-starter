import Joi, { ObjectSchema } from 'joi';

const httpErrors = new Map([
  [400, 'Bad Request'],
  [401, 'Unauthorized'],
  [403, 'Forbidden'],
  [404, 'Not Found'],
  [422, 'Unprocessable Entity'],
  [500, 'Internal Server Error'],
]);

const getSchemaForHttpError = (status: number, error: string) => {
  return Joi.object({
    statusCode: status,
    error,
    message: Joi.string(),
  }).label(error.replace(' ', '') + 'Response');
};

export function getResponseSchemaForErrors(errors: number[]) {
  const result: { [key: number]: ObjectSchema } = {};

  errors.forEach((code) => {
    result[code] = getSchemaForHttpError(code, httpErrors.get(code) || 'Error');
  });

  return result;
}

export type ErrorResponse = {
  statusCode: number;
  error: string;
  message: string;
};
