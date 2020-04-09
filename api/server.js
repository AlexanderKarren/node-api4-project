const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js')

const server = express();

server.use(logger);

server.use(express.json()); // built-in middleware
server.use(helmet());
server.use(cors())

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl} on ${Date()}`)
  next();
}

module.exports = server;
