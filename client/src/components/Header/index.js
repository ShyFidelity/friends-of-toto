import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
      <Link className="text-dark" to="/profile">
        <h1 className="m-0" style={{ fontSize: '3rem' }}>
          Profile
        </h1>
      </Link>
      <Link className="text-dark" to="/following">
        <h1 className="m-0" style={{ fontSize: '3rem' }}>
          Following
        </h1>
      </Link>
      <Link className="text-dark" to="/discover">
        <h1 className="m-0" style={{ fontSize: '3rem' }}>
          Discover
        </h1>
      </Link>
    </header>
  );
};

export default Header;
