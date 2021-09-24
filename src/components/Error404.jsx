import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Volver al Login
    </Link>
  </div>
);

export default Error404