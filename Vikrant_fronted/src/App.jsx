import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

// Components
import Navbar from './components/common/Navbar/navbar';
import LoadingSpinner from './components/common/Loadingspinner/loadingspinner';
import ProtectedRoute from './components/Auth/protectedroute';
import AuthGuard from './components/Auth/Authguard';

// Pages
import HomePage from './pages/public/Home/Home';
import TeamPage from './pages/public/Team/Team';
import ContactPage from './pages/public/Contact/Contact';
import ProjectPage from './pages/public/Projcet/project';
import ServiceBooking from './pages/private/service/service';
import Dashboard from './pages/private/Dashboard/dashboard';
import Login from './pages/Auth/Login';
import PasswordSetup from './pages/Auth/SetPassword';

// UI Components
import ChatBot from './components/ui/Chatbot/chatbot';

// Constants
import { ROUTES } from './utils/constants';

// Layout wrapper for pages that need navbar and chatbot
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ChatBot />
    </>
  );
};

// Auth layout for login/signup pages
const AuthLayout = ({ children }) => {
  return <main className="auth-layout">{children}</main>;
};

// App content component that uses auth context
const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Initializing application..." />;
  }

  return (
    <AuthGuard>
      <Routes>
        {/* Public Routes with Layout */}
        <Route path={ROUTES.HOME} element={<Layout><HomePage /></Layout>} />
        <Route path={ROUTES.TEAM} element={<Layout><TeamPage /></Layout>} />
        <Route path={ROUTES.CONTACT} element={<Layout><ContactPage /></Layout>} />
        <Route path={ROUTES.PROJECT} element={<Layout><ProjectPage /></Layout>} />

        {/* Protected Routes with Layout */}
        <Route 
          path={ROUTES.SERVICE} 
          element={
            <ProtectedRoute>
              <Layout><ServiceBooking /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path={ROUTES.DASHBOARD} 
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } 
        />

        {/* Auth Routes without Layout */}
        <Route 
          path={ROUTES.LOGIN} 
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } 
        />
        <Route 
          path={ROUTES.SETUP_PASSWORD} 
          element={
            <AuthLayout>
              <PasswordSetup />
            </AuthLayout>
          } 
        />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </AuthGuard>
  );
};

// Main App component
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;