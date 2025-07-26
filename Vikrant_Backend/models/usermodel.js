import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true // All users must have password after Google registration
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  provider: {
    type: String,
    default: 'google' // All users start with Google
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Track registration completion status
  registrationComplete: {
    type: Boolean,
    default: false
  },
  // Store temporary data during registration process
  tempRegistrationData: {
    googleId: String,
    email: String,
    name: String,
    profilePicture: String
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  preferences: {
    bikeType: {
      type: String,
      enum: ['mountain', 'road', 'hybrid', 'commuter', 'folding'],
      default: null
    },
    newsletter: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });

// Pre-save middleware
userSchema.pre('save', async function(next) {
  // Extract first/last name from full name
  if (this.name && !this.firstName && !this.lastName) {
    const nameParts = this.name.split(' ');
    this.firstName = nameParts[0];
    this.lastName = nameParts.slice(1).join(' ');
  }

  // Hash password if it's modified and not already hashed
  if (this.isModified('password') && this.password) {
    if (!this.password.startsWith('$2b$')) { // Check if already hashed
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to complete registration with password
userSchema.methods.completeRegistration = function(password) {
  if (this.tempRegistrationData) {
    this.googleId = this.tempRegistrationData.googleId;
    this.email = this.tempRegistrationData.email;
    this.name = this.tempRegistrationData.name;
    this.profilePicture = this.tempRegistrationData.profilePicture;
    this.tempRegistrationData = undefined; // Remove temp data
  }
  this.password = password;
  this.registrationComplete = true;
};

const User = mongoose.model('User', userSchema);
export default User;
