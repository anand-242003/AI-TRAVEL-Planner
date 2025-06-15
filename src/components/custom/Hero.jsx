import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css'; 


function Hero() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 20px',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url("https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h1 style={{ maxWidth: '720px', lineHeight: 1.4 }}>
        <span
          style={{
            display: 'block',
            fontSize: '2.75rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            color: 'white',
          }}
        >
          Plan Your Next Adventure with{' '}
          <span style={{ color: 'aqua', fontWeight: '700' }}>AI</span>
        </span>
        <span style={{ fontSize: '1.25rem', color: 'lightgray' }}>
          Smart, personalized itineraries designed to fit your travel dreams
        </span>

      </h1>
      <Link to={"/create-trip"}>
      <button style={{ backgroundColor: "transparent", border: "1px solid white", color: "aqua", padding: "10px 20px", borderRadius: "5px", marginTop: "20px", fontSize: "1rem", cursor: "pointer" }}
       
       >
         Get Started, it's free!
 
       </button></Link>
      {/* <button style={{ backgroundColor: "transparent", border: "1px solid white", color: "aqua", padding: "10px 20px", borderRadius: "5px", marginTop: "20px", fontSize: "1rem", cursor: "pointer" }}
       
      >
        Get Started, t's free!

      </button> */}

    </div>
  );
}

export default Hero;