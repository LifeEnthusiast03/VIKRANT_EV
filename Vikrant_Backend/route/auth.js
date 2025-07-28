import express from 'express';
import passport from '../config/passport.js';
import User from '../models/usermodel.js';
import { isAuthenticated, needsPasswordSetup,cheakLogin,debugLogin } from '../middleware/auth.js';
import { handleCallbackUrl,handleCheakRegistration,handleCompleRegistationWithPassword, handleLogout, handleMe,} from '../controllers/authcontrollers.js';

const router = express.Router();


router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=auth_failed`
  }),
  handleCallbackUrl
);

router.post('/complete-registration', needsPasswordSetup, handleCompleRegistationWithPassword);

// Login with email/password
router.post('/login',debugLogin, cheakLogin);

// Logout route
router.post('/logout', handleLogout);

// Get current user info
router.get('/me', isAuthenticated, handleMe);

// Check registration status
router.get('/registration-status', handleCheakRegistration);

// Simple test endpoint
router.get('/test', (req, res) => {
  res.json({
    message: 'Auth route is working',
    authenticated: req.isAuthenticated(),
    user: req.user || null,
    sessionID: req.sessionID,
    timestamp: new Date().toISOString()
  });
});

// Debug endpoint for session info
router.get('/debug', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user || null,
    session: {
      id: req.sessionID,
      cookie: req.session.cookie,
      passport: req.session.passport || null
    },
    headers: {
      userAgent: req.get('User-Agent'),
      origin: req.get('Origin'),
      referer: req.get('Referer')
    },
    timestamp: new Date().toISOString()
  });
});



export default router;