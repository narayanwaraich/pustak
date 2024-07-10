import dotenv from 'dotenv';
dotenv.config();

/* const DATABASE_ENV = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
};

const TEST_DATABASE_ENV = {
  user: process.env.TEST_DATABASE_USER,
  password: process.env.TEST_DATABASE_PASSWORD,
  host: process.env.TEST_DATABASE_HOST,
  port: Number(process.env.TEST_DATABASE_PORT),
}; */

export const DATABASE_URL = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

export const PORT = process.env.PORT || 3001;
export const SECRET = process.env.SECRET;