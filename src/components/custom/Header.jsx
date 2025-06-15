import React from 'react';
import { Button } from '../ui/button';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="logo-wrapper">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Enware.ai logo" />
        <span>Enware.ai</span>
      </div>
      <Button>Sign in</Button>
    </div>
  );
}

export default Header;
