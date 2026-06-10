const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hospital_management',
  MONGODB_SERVER_SELECTION_TIMEOUT_MS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) || 10000,
};
