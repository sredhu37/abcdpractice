const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const usersController = require('./api/users');
const questionsController = require('./api/questions');
const auth = require('./api/auth');

const cookieObject = {
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  name: 'jhakhaas-session',
  keys: ['jhakhaas-key1', 'jhakhaas-key2'],
};

const app = express();
app.use(helmet()); // good for security
app.use(cors({ credentials: true, origin: config.other.CLIENT_URL }));
app.use(express.json());
app.use(middleware.logRequest);
app.use(cookieSession(cookieObject));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/users', usersController.usersRouter);
app.use('/api/questions', questionsController.questionsRouter);
app.use('/auth', auth.authRouter);
app.use(express.static(path.join(__dirname, '../frontend/build')));

const { PORT } = config.other;

const connectToMongoDB = (mongoUri) => {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then(() => {
      logger.info('Successfully connected to MongoDB!');
    })
    .catch((error) => {
      logger.error(error);
    });
};

const MONGO_URI = config.mongo.URI;

if (MONGO_URI && (MONGO_URI !== 'undefined')) {
  connectToMongoDB(MONGO_URI);
} else {
  logger.error('ERROR: Make sure MONGO_URI environment variable is set properly!');
  process.exit(1);
}

// routes begin here
app.get('/logs', (req, res) => {
  const logFilePath = path.join(__dirname, './logs/app.log');
  const stat = fs.statSync(logFilePath);

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Length': stat.size,
  });

  const readStream = fs.createReadStream(logFilePath);
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
});

app.get('/*', (req, res) => {
  if (process.env.NODE_ENV === 'PROD') {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  } else { // DEV environment
    res.json({ msg: 'DEV Environment: Backend seems to be running fine. Yay!' });
  }
});

// routes end here

app.listen(PORT, () => {
  logger.info(`Listening on ${config.other.HOST}:${PORT}`);
});
