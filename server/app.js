import express from 'express';
import { join } from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import Debug from 'debug';
import swaggerMiddleware from './helpers/swagger';
import database from './db/db';

const debug = Debug('wayfarer:express');
const app = express();

database()
  .then(() => debug('Successfully connected to database'))
  .catch((err) => debug(`unable to connect to database: ${err}`));

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, '../public')));
swaggerMiddleware(app);

export default app;
