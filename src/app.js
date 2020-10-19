const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

// handle errors
const { errorHandler } = require('./common/errorHandler');
const { logger, logInfo } = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// catch errors process: uncaughtException
process.on('uncaughtException', error => {
  logger.log('error', `captured error: ${error.message}`);
  setTimeout(() => {
    throw new Error(error.message);
  }, 1000);
});

// catch errors process: unhandledRejection
process.on('unhandledRejection', reason => {
  logger.log('error', `Unhandled rejection: ${reason.message}`);
  setTimeout(() => {
    throw new Error(reason.message);
  }, 1000);
});

app.use('/users', userRouter);
app.use('/boards', [boardRouter, taskRouter]);
app.use(errorHandler);
app.use(logInfo);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
  next();
});

module.exports = app;
