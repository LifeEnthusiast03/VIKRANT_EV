import { runInNewContext } from 'vm';
import User from '../models/usermodel.js';
import { log } from 'console';

const handleCallbackUrl = (req,res)=>{
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'https://vikrant-ev.vercel.app';
      
      console.log('OAuth callback - User object:', req.user);
      console.log('OAuth callback - Session ID:', req.sessionID);
      console.log('OAuth callback - Is authenticated:', req.isAuthenticated());
      
      // Always redirect to the OAuth callback handler page
      // The frontend will determine where to go based on auth status
      res.redirect(`${frontendUrl}/auth/callback`);
      
    } catch (error) {
      console.error('Error in Google callback:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'https://vikrant-ev.vercel.app';
      res.redirect(`${frontendUrl}/login?error=auth_failed`);
    }
}
const handleCompleRegistationWithPassword= async(req,res)=>{
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
}
const handleLogout = (req,res)=>{
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
}
const handleMe = (req,res)=>{
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
}
const handleCheakRegistration = (req, res) => {
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
}



export {handleCallbackUrl,handleCompleRegistationWithPassword,handleLogout,handleMe,handleCheakRegistration}