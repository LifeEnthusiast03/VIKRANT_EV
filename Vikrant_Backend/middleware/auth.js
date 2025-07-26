export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() && !req.user.needsPasswordSetup) {
    return next();
  }
  res.status(401).json({ message: 'Please log in to access this resource' });
};

export const needsPasswordSetup = (req, res, next) => {
  if (req.isAuthenticated() && req.user.needsPasswordSetup) {
    return next();
  }
  res.status(400).json({ message: 'Invalid request' });
};