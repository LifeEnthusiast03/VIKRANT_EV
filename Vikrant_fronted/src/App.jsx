

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

// Components
import Navbar from './components/common/Navbar/navbar';
import ElectricBikeChatbot from './components/ui/Bikebot/bikechatbot';
import { ROUTES } from './utils/constants';

// Layout component for pages that need navbar
const Layout = ({ children, showChatbot = true }) => (
  <div className="relative">
    <Navbar />
    {children}
    {showChatbot && <ElectricBikeChatbot />}
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route 
            path={ROUTES.LOGIN} 
            element={<Login />} 
          />
          <Route 
            path={ROUTES.SETUP_PASSWORD} 
            element={<PasswordSetup />} 
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

          {/* Redirect root to home */}
          <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;