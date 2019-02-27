import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

const AppWithRouter = withRouter(App);
const app = (
  <Router>
    <AppWithRouter />
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));
