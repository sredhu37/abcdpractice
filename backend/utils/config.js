require('dotenv').config();
const logger = require('./logger');
const { exists } = require('./commonMethods');

const resultObj = {};

if (exists(process.env.MONGO_URI)) {
  const mongoObj = { URI: process.env.MONGO_URI };
  resultObj.mongo = mongoObj;
} else {
  logger.error('Issue with MONGO env vars! Please inform Administrator immediately!');
  process.exit(1);
}

if (
  exists(process.env.GOOGLE_CLIENT_ID)
  && exists(process.env.GOOGLE_CLIENT_SECRET)
  && exists(process.env.GOOGLE_REDIRECT_URI)
) {
  const googleObj = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  };

  resultObj.google = googleObj;
} else {
  logger.error('Issue with GOOGLE env vars! Please inform Administrator immediately!');
  process.exit(1);
}

if (
  exists(process.env.HOST) &&
  exists(process.env.PORT) &&
  exists(process.env.CLIENT_URL) &&
  exists(process.env.NODE_ENV)
) {
  const otherObj = {
    HOST: process.env.HOST || 'http://127.0.0.1',
    PORT: process.env.PORT || 3000,
    CLIENT_URL: process.env.CLIENT_URL,
    NODE_ENV: process.env.NODE_ENV
  };
  
  resultObj.other = otherObj;
} else {
  logger.error('Issue with OTHER env vars! Please inform Administrator immediately!');
  process.exit(1);
}

module.exports = resultObj;
