import express from 'express';
import { join } from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import swaggerMiddleware from './helpers/swagger';

const app = express();

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, '../public')));
swaggerMiddleware(app);

export default app;
