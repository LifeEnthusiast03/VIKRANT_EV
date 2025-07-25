import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/usermodel.js';

// Local Strategy (Email/Password) - Only for login, not registration
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Find user with completed registration only
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      registrationComplete: true 
    });
    
    if (!user) {
      return done(null, false, { message: 'No account found. Please register with Google first.' });
    }

    const isValidPassword = await user.comparePassword(password);
    
    if (!isValidPassword) {
      return done(null, false, { message: 'Invalid password' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Google Strategy - For both registration and login
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with completed registration
    let user = await User.findOne({ 
      googleId: profile.id,
      registrationComplete: true 
    });
    
    if (user) {
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
      // Link Google account to existing user
      user.googleId = profile.id;
      user.profilePicture = profile.photos[0].value;
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
      // Continue existing incomplete registration
      const tempUser = {
        _id: user._id,
        email: profile.emails[0].value,
        name: profile.displayName,
        profilePicture: profile.photos[0].value,
        needsPasswordSetup: true,
        isNewRegistration: false
      };
      return done(null, tempUser);
    }
    
    // New registration - create temporary user
    const tempUser = {
      email: profile.emails[0].value,
      name: profile.displayName,
      profilePicture: profile.photos[0].value,
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
  if (user.needsPasswordSetup) {
    // For users needing password setup, store the temp data
    done(null, { tempUser: user, needsPasswordSetup: true });
  } else {
    done(null, user._id);
  }
});

// Deserialize user from session
passport.deserializeUser(async (data, done) => {
  try {
    if (data.needsPasswordSetup) {
      // Return temp user data
      done(null, data.tempUser);
    } else {
      const user = await User.findById(data);
      done(null, user);
    }
  } catch (error) {
    done(error, null);
  }
});

export default passport;

