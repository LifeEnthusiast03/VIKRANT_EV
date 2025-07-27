import express from 'express';
import passport from '../config/passport.js';
import User from '../models/usermodel.js';
import { isAuthenticated, needsPasswordSetup } from '../middleware/auth.js';

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
  (req, res) => {
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      
      console.log('Google callback - user:', req.user);
      console.log('User needs password setup:', req.user?.needsPasswordSetup);
      console.log('User is new registration:', req.user?.isNewRegistration);
      
      // Check if user needs password setup (new registration)
      if (req.user && req.user.needsPasswordSetup) {
        console.log('Redirecting to password setup');
        // Redirect to frontend password setup page
        res.redirect(`${frontendUrl}/setup-password`);
      } else if (req.user) {
        console.log('Redirecting to dashboard - existing user');
        // Existing user - redirect to frontend dashboard  
        res.redirect(`${frontendUrl}/dashboard`);
      } else {
        console.log('No user object found, redirecting to login with error');
        res.redirect(`${frontendUrl}/login?error=auth_failed`);
      }
    } catch (error) {
      console.error('Error in Google callback:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/login?error=auth_failed`);
    }
  }
);

// Complete registration by setting password
router.post('/complete-registration', needsPasswordSetup, async (req, res) => {
  try {
    console.log('Complete registration request received');
    console.log('Request user:', req.user);
    console.log('Request body:', req.body);

    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    let user;

    if (req.user.isNewRegistration) {
      console.log('Creating new user for first-time registration');
      // Create new user with all required fields
      user = new User({
        googleId: req.user.googleId,
        email: req.user.email,
        name: req.user.name,
        profilePicture: req.user.profilePicture,
        password: password,
        registrationComplete: true,
        provider: 'google',
        lastLogin: new Date()
      });
      await user.save();
      console.log('New user created successfully:', user._id);
    } else {
      console.log('Completing existing incomplete registration');
      // Get existing incomplete user
      user = await User.findById(req.user._id);
      if (!user) {
        return res.status(400).json({ message: 'Registration session expired' });
      }
      
      // Complete the registration using the model method
      user.completeRegistration(password);
      await user.save();
      console.log('Existing user registration completed:', user._id);
    }

    // Re-login with the completed user
    req.login(user, (err) => {
      if (err) {
        console.error('Login after registration failed:', err);
        return res.status(500).json({ message: 'Registration completed but login failed' });
      }
      
      console.log('User logged in successfully after registration');
      res.json({
        message: 'Registration completed successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture
        }
      });
    });

  } catch (error) {
    console.error('Registration completion error:', error);
    res.status(500).json({ 
      message: 'Registration failed', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

// ================================
// LOGIN (Both Google and Email/Password)
// ================================

// Login with email/password
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication error' });
    }
    
    if (!user) {
      return res.status(401).json({ 
        message: info.message || 'Invalid credentials',
        hint: 'Remember to register with Google first if you don\'t have an account'
      });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed' });
      }
      
      res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture
        }
      });
    });
  })(req, res, next);
});

// ================================
// COMMON ROUTES
// ================================

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error destroying session' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});

// Get current user info
router.get('/me', isAuthenticated, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profilePicture: req.user.profilePicture,
      preferences: req.user.preferences,
      provider: req.user.provider
    }
  });
});

// Check registration status
router.get('/registration-status', (req, res) => {
  console.log('Registration status check - authenticated:', req.isAuthenticated());
  console.log('User object:', req.user);
  
  if (req.isAuthenticated() && req.user.needsPasswordSetup) {
    const response = {
      needsPasswordSetup: true,
      email: req.user.email,
      name: req.user.name,
      isNewRegistration: req.user.isNewRegistration || false,
      profilePicture: req.user.profilePicture
    };
    console.log('Sending response:', response);
    res.json(response);
  } else if (req.isAuthenticated()) {
    const response = { 
      needsPasswordSetup: false,
      isAuthenticated: true 
    };
    console.log('Sending response:', response);
    res.json(response);
  } else {
    const response = { 
      needsPasswordSetup: false,
      isAuthenticated: false 
    };
    console.log('Sending response:', response);
    res.json(response);
  }
});

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

// Update user preferences
router.put('/preferences', isAuthenticated, async (req, res) => {
  try {
    const { bikeType, newsletter } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 
        'preferences.bikeType': bikeType,
        'preferences.newsletter': newsletter
      },
      { new: true }
    );
    
    res.json({ message: 'Preferences updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating preferences' });
  }
});

// Change password (for existing users)
router.put('/change-password', isAuthenticated, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user._id);
    
    // Verify current password
    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Failed to update password' });
  }
});

export default router;