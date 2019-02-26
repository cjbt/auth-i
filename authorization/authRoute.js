const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/dbConfig');
const jwt = require('jsonwebtoken');
const route = express.Router();

route.post('/register', (req, res) => {
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

route.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ message: 'Fields required' });
  } else {
    db('auth')
      .where({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: 60
          });
          res.json({ message: `Welcome ${user.username}`, token });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

module.exports = route;
