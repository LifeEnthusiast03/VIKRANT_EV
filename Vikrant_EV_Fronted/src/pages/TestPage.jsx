import React from 'react';
import { useAuth } from '../hooks/useAuth';

const TestPage = () => {
  const auth = useAuth();
  
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('https://vikrant-ev-backend.vercel.app/auth/registration-status', {
        credentials: 'include'
      });
      const data = await response.json();
      console.log('Auth Status Check:', data);
      alert('Auth Status: ' + JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Auth check failed:', error);
      alert('Auth check failed: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page - Routing Works!</h1>
      <p>If you can see this page, then React Router is working correctly.</p>
      <p>Current URL: {window.location.pathname}</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Auth Context Status:</h3>
        <p><strong>User:</strong> {auth.user ? JSON.stringify(auth.user) : 'null'}</p>
        <p><strong>Loading:</strong> {auth.loading ? 'true' : 'false'}</p>
        <p><strong>Is Authenticated:</strong> {auth.isAuthenticated ? 'true' : 'false'}</p>
        <p><strong>Needs Password Setup:</strong> {auth.needsPasswordSetup ? 'true' : 'false'}</p>
        <p><strong>Registration Step:</strong> {auth.registrationStep || 'null'}</p>
        <p><strong>Error:</strong> {auth.error || 'none'}</p>
        
        <button onClick={checkAuthStatus} style={{ marginTop: '10px', padding: '5px 10px' }}>
          Check Auth Status (API Call)
        </button>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Navigation Test Links:</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/setup-password">Setup Password</a></li>
          <li><a href="/test">This Test Page</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Auth Actions:</h2>
        <button onClick={() => auth.checkAuthStatus()} style={{ margin: '5px', padding: '5px 10px' }}>
          Refresh Auth Status
        </button>
        <a href="https://vikrant-ev-backend.vercel.app/auth/google" style={{ margin: '5px', padding: '5px 10px', display: 'inline-block', backgroundColor: '#4285f4', color: 'white', textDecoration: 'none' }}>
          Login with Google
        </a>
      </div>
    </div>
  );
};

export default TestPage;
