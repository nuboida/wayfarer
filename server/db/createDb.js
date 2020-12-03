import pgtools from 'pgtools';
import Debug from 'debug';
import dotenv from 'dotenv';

const debugDB = Debug('wayfarer:database');
dotenv.config();

const createDB = async () => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  };
  try {
    const res = await pgtools.createdb(config, 'wayfarer');
    debugDB(res);
  } catch (err) {
    if (err.message.includes('Attempted to create a duplicate database.')) {
      debugDB(err.message);
      return false;
    }
    process.exit(-1);
  }
  return true;
};

export default createDB;
