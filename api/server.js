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
  res.send(`
  <div style="font-family:'Arial',sans-serif;display:flex;flex-direction:column;align-items:center;">
    <h1>Frodo and Friends</h1>
    <h2>IT'S WORKING</h2>
    <img src="https://media.tenor.com/images/7e567df8c48649cc2d40caadcd127523/tenor.gif" alt="frodooo"/>
  </div>
  `);
});

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl} on ${Date()}`)
  next();
}

module.exports = server;
