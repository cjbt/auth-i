const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const restrictedRoute = require('./routes/restricted/users');
const authRoute = require('./authorization/authRoute');
const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());

server.use('/', authRoute);
server.use('/api/restricted', restrictedRoute);

server.get('/', (req, res) => {
  res.send('<h1>Server Is Working</h1>');
});

module.exports = server;
