require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
