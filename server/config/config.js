import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    user: 'postgres',
    host: '127.0.0.1',
    database: process.env.DEV_DB,
    password: process.env.DB_PASS,
    port: 5432,
  },
  test: {
    user: 'postgres',
    host: '127.0.0.1',
    database: process.env.TEST_DB,
    password: process.env.DB_PASS,
    port: 5432,
  },
  production: {
    user: process.env.User,
    host: process.env.Host,
    database: process.env.Database,
    password: process.env.Password,
    port: process.env.Port,
  },
};
