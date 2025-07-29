import React from 'react';

const TestPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page - Routing Works!</h1>
      <p>If you can see this page, then React Router is working correctly.</p>
      <p>Current URL: {window.location.pathname}</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Navigation Test Links:</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/setup-password">Setup Password</a></li>
          <li><a href="/test">This Test Page</a></li>
        </ul>
      </div>
    </div>
  );
};

export default TestPage;
