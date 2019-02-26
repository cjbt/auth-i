const express = require('express');
const db = require('../../data/dbConfig');

const authenticate = require('../../authorization/authenticate');
const route = express.Router();

route.get('/users', authenticate.auth, (req, res) => {
  db('auth')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = route;
