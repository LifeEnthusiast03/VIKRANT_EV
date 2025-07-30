import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/usermodel.js';

// Local Strategy (Email/Password) - Only for login, not registration


passport.use(new LocalStrategy({
  usernameField: 'email', // Tell passport to use 'email' field instead of 'username'
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    console.log('Local Strategy - Attempting login for:', email);
    
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log('Local Strategy - User not found:', email);
      return done(null, false, { message: 'Invalid credentials' });
    }
    
    console.log('Local Strategy - User found:', {
      id: user._id,
      email: user.email,
      hasPassword: !!user.password,
      provider: user.provider
    });
    
    // Check if user has a password set (important for Google users)
    if (!user.password) {
      console.log('Local Strategy - User has no password set');
      return done(null, false, { 
        message: 'Please set a password first or login with Google' 
      });
    }
    
    // Verify password
    const isValidPassword = await user.comparePassword(password);
    console.log('Local Strategy - Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    
    // Check if registration is complete
    if (!user.registrationComplete) {
      return done(null, false, { 
        message: 'Please complete your registration first' 
      });
    }
    
    console.log('Local Strategy - Login successful for:', email);
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Return successful user
    return done(null, user);
    
  } catch (error) {
    console.error('Local Strategy - Error:', error);
    return done(error);
  }
}));

// Google Strategy - For both registration and login
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' 
    ? "https://vikrant-backend.vercel.app/auth/google/callback"
    : "http://localhost:5000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
   
    // Check if user already exists with completed registration
    let user = await User.findOne({ 
      googleId: profile.id,
      registrationComplete: true 
    });
    
    if (user) {
      console.log('Existing user found, logging in');
      // Existing user - login
      user.lastLogin = new Date();
      await user.save();
      return done(null, user);
    }
    
    // Check if user exists by email with completed registration
    user = await User.findOne({ 
      email: profile.emails[0].value,
      registrationComplete: true 
    });
    
    if (user) {
      console.log('User found by email, linking Google account');
      // Link Google account to existing user
      user.googleId = profile.id;
      user.profilePicture = profile.photos[0]?.value;
      user.lastLogin = new Date();
      await user.save();
      return done(null, user);
    }
    
    // Check if there's an incomplete registration for this Google ID
    user = await User.findOne({ 
      'tempRegistrationData.googleId': profile.id,
      registrationComplete: false 
    });
    
    if (user) {
      console.log('Continuing existing incomplete registration');
      // Continue existing incomplete registration
      const tempUser = {
        _id: user._id,
        email: profile.emails[0].value,
        name: profile.displayName,
        profilePicture: profile.photos[0]?.value,
        needsPasswordSetup: true,
        isNewRegistration: false
      };
      return done(null, tempUser);
    }
    
    console.log('Creating new temporary registration');
    // New registration - create temporary user
    const tempUser = {
      email: profile.emails[0].value,
      name: profile.displayName,
      profilePicture: profile.photos[0]?.value,
      googleId: profile.id,
      needsPasswordSetup: true,
      isNewRegistration: true
    };
    
    return done(null, tempUser);
    
  } catch (error) {
    console.error('Error in Google Strategy:', error);
    done(error, null);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  console.log('Serializing user:', {
    hasId: !!user._id,
    needsPasswordSetup: !!user.needsPasswordSetup,
    isNewRegistration: !!user.isNewRegistration,
    email: user.email
  });
  
  if (user.needsPasswordSetup) {
    // For users needing password setup, store the temp data with a consistent identifier
    console.log('need pasword setup');
    
    done(null, { 
      tempUser: user, 
      needsPasswordSetup: true,
      type: 'incomplete_registration'
    });
  } else {
      console.log('no need pasword setup');
    done(null, { 
      userId: user._id.toString(),
      type: 'complete_user'
    });
  }
});

// Deserialize user from session
passport.deserializeUser(async (data, done) => {
  try {
    console.log('Deserializing user:', {
      type: data.type,
      needsPasswordSetup: data.needsPasswordSetup,
      hasUserId: !!(data.userId),
      hasTempUser: !!(data.tempUser)
    });
    
    if (data.type === 'incomplete_registration' && data.needsPasswordSetup) {
      // Return temp user data with consistent structure
      const tempUser = {
        ...data.tempUser,
        needsPasswordSetup: true
      };
      console.log('Returning temp user for password setup');
      done(null, tempUser);
    } else if (data.type === 'complete_user') {
      const user = await User.findById(data.userId);
      if (!user) {
        console.log('User not found in database:', data.userId);
        return done(new Error('User not found'), null);
      }
      console.log('Returning complete user:', user.email);
      done(null, user);
    } else {
      // Fallback for old session format or direct user ID
      if (typeof data === 'string') {
        const user = await User.findById(data);
        done(null, user);
      } else if (data.needsPasswordSetup) {
        // Legacy format
        done(null, data.tempUser);
      } else {
        console.log('Invalid session data structure:', data);
        done(new Error('Invalid session data'), null);
      }
    }
  } catch (error) {
    console.error('Deserialize error:', error);
    done(error, null);
  }
});

export default passport;

