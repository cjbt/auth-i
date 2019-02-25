const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());

server.listen(5000, () => {
  console.log('Listening on port 5000');
});
