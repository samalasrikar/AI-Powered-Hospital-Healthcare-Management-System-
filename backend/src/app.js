const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');


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
      'http://localhost:5174',
      'http://localhost:5175',
      process.env.FRONTEND_URL
    ],
    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Body Parser
|--------------------------------------------------------------------------
*/
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Prevent NoSQL Injection
| Express 5 makes req.query a read-only getter, so mongoSanitize() middleware
| crashes when it tries to overwrite it. We call mongoSanitize.sanitize()
| directly on req.body and req.params only — safe in all Express versions.
|--------------------------------------------------------------------------
*/
app.use((req, _res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  next();
});

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

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    project: 'AI Powered Hospital Healthcare Management System',
    status: 'Running'
  });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;