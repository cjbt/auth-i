require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/dbConfig');
const bcrypt = require('bcryptjs');

const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
  res.send('<h1>Server Is Working</h1>');
});

server.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  if (!username || !password) {
    res.status(422).json({ message: 'Fields required' });
  } else {
    db('auth')
      .insert({ username, password: hash })
      .then(user => {
        res.json({ message: `You have been logged in, ${username}` });
      })
      .catch(err =>
        res.status(400).json({ message: 'Could not be added', err })
      );
  }
});

server.get('/users', (req, res) => {
  db('auth')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json(err));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
