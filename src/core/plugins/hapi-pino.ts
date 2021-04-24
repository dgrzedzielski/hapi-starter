import hapiPino from 'hapi-pino';

const options: hapiPino.Options = {
  prettyPrint: process.env.NODE_ENV === 'development',
  // Redact Authorization headers, see https://getpino.io/#/docs/redaction
  redact: ['req.headers.authorization'],
};

export default {
  plugin: hapiPino,
  options,
};
