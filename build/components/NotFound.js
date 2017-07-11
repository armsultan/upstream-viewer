import React from 'react';
import {BrowserRouter, Route, Switch, Link, withRouter} from 'react-router-dom';

const NotFound = () =>
  <div>
    <h3>404 page not found</h3>
    <p>We are sorry but the page you are looking for does not exist.</p>
    <p>Return to <Link to='/'>Home</Link></p>

  </div>

export default NotFound;