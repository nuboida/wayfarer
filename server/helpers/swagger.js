import swaggerMiddleware from 'swagger-express-middleware';
import path from 'path';
import dotenv from 'dotenv';
import routes from '../routes/index';
import getErrorMessage from './errorHandlers';

dotenv.config();

const swagger = (app) => {
  swaggerMiddleware(path.join(__dirname, '../wayfarer.yml'), app, (err, middleware) => {
    // Enable Express' case-sensitive and strict options
    // (so "/entities", "/Entities", and "/Entities/" are all different)
    app.enable('case sensitive routing');
    app.enable('strict routing');

    app.use(middleware.metadata());
    app.use(middleware.files({
      // Override the Express App's case-sensitive
      // and strict-routing settings for the Files middleware.
      caseSensitive: false,
      strict: false,
    }, {
      useBasePath: false,
      apiPath: '/api/v1/spec',
      // Disable serving the "api.yml" file
      // rawFilesPath: false
    }));

    app.use(middleware.parseRequest({
      // Configure the cookie parser to use secure cookies
      cookie: {
        secret: process.env.COOKIE_SECRET_KEY,
      },

      json: {
        limit: process.env.REQUEST_LIMIT,
      },
    }));

    // These two middleware don't have any options (yet)
    app.use(
      middleware.CORS(),
      middleware.validateRequest(),
    );

    app.use('/api/v1/', routes);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      const error = new Error('Not Found');
      error.status = 404;
      next(error);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use((error, req, res) => {
        res.status(error.status || 500);
        res.json({
          status: 'Error',
          message: getErrorMessage(err),
        });
      });
    }
  });
};

export default swagger;
