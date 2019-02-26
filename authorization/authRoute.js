require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/dbConfig');
// const jwt = require('jsonwebtoken');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const route = express.Router();

route.use(
  session({
    name: 'monkey',
    secret: 'keep it secret, keep it safe!',
    cookie: {
      maxAge: 1000 * 60 * 15, // in ms
      secure: false // used over https only
    },
    httpOnly: false, // cannot access the cookie from js using document.cookie
    resave: false,
    saveUninitialized: false, // laws against setting cookies automatically

    store: new KnexSessionStore({
      knex: db,
      tablename: 'sessions',
      sidfieldname: 'sid',
      createTable: true,
      clearInterval: 1000 * 60 * 60
    })
  })
);

route.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json({ message: 'username and password fields required' });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    db('auth')
      .insert({ username, password: hash })
      .then(user => {
        res.json({ message: `You have registered, ${username}!` });
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
          // const token = jwt.sign(user, process.env.SECRET_KEY, {
          //   expiresIn: 60
          // });
          req.session.user = user;
          res.json({ message: `Welcome ${user.username}` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(err => {
        res.status(500).json({ err, message: 'sucks bro' });
      });
  }
});

module.exports = route;
