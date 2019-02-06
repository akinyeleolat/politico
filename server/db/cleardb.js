import { Pool } from 'pg';
import setup from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = setup[env];

let $db;

if (config.use_env_variable) {
  $db = new Pool(process.env[config.use_env_variable]);
} else {
  $db = new Pool(config);
}

const db = $db;
/**
   * This is a query to drop tables for testing
   * @constant
   */
const dropTable = () => {
  const query = `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS party CASCADE;
  DROP TABLE IF EXISTS office CASCADE;
  DROP TABLE IF EXISTS candidates CASCADE;
  DROP TABLE IF EXISTS vote CASCADE;
  DROP TABLE IF EXISTS petitions CASCADE;
  `;
  return new Promise((resolve, reject) => {
    db.query(query, (err, response) => {
      if (err) {
        reject(Error(err.message));
      }
      if (response) {
        resolve();
      }
    });
  });
};
dropTable().then(() => {
  console.log('Datatbase refreshed');
}).catch((error) => {
  console.log('There was an error.', error);
});
