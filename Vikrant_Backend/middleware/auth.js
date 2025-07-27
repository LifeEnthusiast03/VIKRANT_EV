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