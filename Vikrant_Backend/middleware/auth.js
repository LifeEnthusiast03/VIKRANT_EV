

import passport from '../config/passport.js';

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() && !req.user.needsPasswordSetup) {
    return next();
  }
  res.status(401).json({ message: 'Please log in to access this resource' });
};

export const needsPasswordSetup = (req, res, next) => {
  console.log('needsPasswordSetup middleware - checking user:', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user || null,
    needsPasswordSetup: req.user?.needsPasswordSetup
  });
  
  if (req.isAuthenticated() && req.user && req.user.needsPasswordSetup) {
    return next();
  }
  
  console.log('needsPasswordSetup middleware - access denied');
  res.status(400).json({ 
    message: 'Invalid request', 
    debug: {
      isAuthenticated: req.isAuthenticated(),
      hasUser: !!req.user,
      needsPasswordSetup: req.user?.needsPasswordSetup
    }
  });
};

export const cheakLogin = (req, res, next) => {
  console.log('Login attempt:', req.body);
  
  passport.authenticate('local', (err, user, info) => {
    console.log('Passport authenticate result:', { err: !!err, user: !!user, info });
    
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json({ message: 'Authentication error' });
    }
    
    if (!user) {
      console.log('Authentication failed:', info);
      return res.status(401).json({ 
        message: info.message || 'Invalid credentials',
        hint: 'Remember to register with Google first if you don\'t have an account'
      });
    }

    req.login(user, (err) => {
      if (err) {
        console.error('req.login error:', err);
        return res.status(500).json({ message: 'Login failed' });
      }
      
      console.log('Login successful for user:', user.email);
      
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
};
export const debugLogin = (req, res, next) => {
  console.log('=== LOGIN DEBUG ===');
  console.log('Request body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('==================');
  next();
};