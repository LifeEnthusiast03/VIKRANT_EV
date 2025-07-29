

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import AuthGuard from './components/Auth/Authguard';
import ProtectedRoute from './components/Auth/protectedroute';

// Auth pages
import Login from './pages/Auth/Login';
import PasswordSetup from './pages/Auth/SetPassword';

// Public pages
import HomePage from './pages/public/Home/Home';
import TeamPage from './pages/public/Team/Team';
import ContactPage from './pages/public/Contact/Contact';
import ProjectPage from './pages/public/Projcet/project';

// Private pages
import ServiceBooking from './pages/private/service/service';
import Dashboard from './pages/private/Dashboard/dashboard';

// Test page for debugging
import TestPage from './pages/TestPage';

// Components
import Navbar from './components/common/Navbar/navbar';
import ElectricBikeChatbot from './components/ui/Bikebot/bikechatbot';
import { ROUTES } from './utils/constants';
import Layout from './Layout/layout';

// Layout component for pages that need navbar


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route 
            path={ROUTES.LOGIN} 
            element={
              <AuthGuard>
                <Login />
              </AuthGuard>
            } 
          />
          <Route 
            path={ROUTES.SETUP_PASSWORD} 
            element={
              <AuthGuard>
                <PasswordSetup />
              </AuthGuard>
            } 
          />

          {/* Public Routes with Navbar */}
          <Route 
            path={ROUTES.HOME} 
            element={
              <Layout>
                <HomePage />
              </Layout>
            } 
          />
          <Route 
            path={ROUTES.TEAM} 
            element={
              <Layout>
                <TeamPage />
              </Layout>
            } 
          />
          <Route 
            path={ROUTES.PROJECT} 
            element={
              <Layout>
                <ProjectPage />
              </Layout>
            } 
          />
          <Route 
            path={ROUTES.CONTACT} 
            element={
              <Layout>
                <ContactPage />
              </Layout>
            } 
          />

          {/* Private Routes with Navbar */}
          <Route 
            path={ROUTES.DASHBOARD} 
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path={ROUTES.SERVICE} 
            element={
              <ProtectedRoute>
                <Layout>
                  <ServiceBooking />
                </Layout>
              </ProtectedRoute>
            } 
          />

          {/* Test Route for debugging */}
          <Route path="/test" element={<TestPage />} />

          {/* Redirect root to home */}
          <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
          
          {/* Catch all route - show what route was attempted */}
          <Route path="*" element={
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
              <h1>Route Not Found</h1>
              <p>Attempted route: {window.location.pathname}</p>
              <p>Available routes: /, /login, /setup-password, /team, /projects, /contact, /dashboard, /service, /test</p>
              <a href="/">Go to Home</a>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;