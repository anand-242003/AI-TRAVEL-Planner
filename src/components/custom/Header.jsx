import React from 'react';
import { Button } from '../ui/button';

function Header() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: 'white',
        borderBottom: '1px solid lightgray',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/logo.svg" alt="Enware.ai logo" style={{ height: '40px' }} />
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'black' }}>Enware.ai</span>
      </div>
      <Button>Sign in</Button>
    </div>
  );
}

export default Header;
