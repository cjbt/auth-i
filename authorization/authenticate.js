const jwt = require('jsonwebtoken');
module.exports = {
  auth: function(req, res, next) {
    const token = req.get('Authorization');
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(500).json({ message: 'You shall not pass!' });
    }
  }
};
