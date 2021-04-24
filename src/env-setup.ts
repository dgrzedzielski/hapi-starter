import dotenv from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';
const isTestEnv = process.env.NODE_ENV === 'test';
const isDevEnv = process.env.NODE_ENV === 'development';

const envFiles = {
  test: '.env.test',
  development: '.env',
} as const;

if (isProduction) {
  require('module-alias/register');
}

if (isTestEnv || isDevEnv) {
  dotenv.config({
    // @ts-ignore
    path: envFiles[process.env.NODE_ENV],
  });
}
