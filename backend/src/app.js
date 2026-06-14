const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');


const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.disable('x-powered-by');
/*
|--------------------------------------------------------------------------
| Security Headers
|--------------------------------------------------------------------------
*/
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Prevent NoSQL Injection
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Body Parser
|--------------------------------------------------------------------------
*/
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Global Rate Limiter
|--------------------------------------------------------------------------
*/
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests. Try again later.',
  },
});

app.use('/api', apiLimiter);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;