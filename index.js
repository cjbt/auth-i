require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/dbConfig');

const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
  res.send('<h1>Server Is Working</h1>');
});

server.get('/users', (req, res) => {
  db('auth')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json(err));
});

server.post('/register', (req, res) => {});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
