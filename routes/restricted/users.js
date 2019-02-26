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

route.get('/logout', authenticate.auth, (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: 'You cannot log out' });
      } else {
        res.json({ message: 'You logged out succesfully' });
      }
    });
  } else {
    res.end();
  }
});
module.exports = route;
