import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {createServer } from 'http'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import contactroute from './route/contactroute.js'
import chatroute from './route/chatroute.js'
import connectDb from './config/database.js'
import passport from './config/passport.js'
import authroute from './route/auth.js';
import serviceRoute from './route/serviceroute.js'

dotenv.config();
connectDb();

// Debug environment variables
console.log('🔧 Environment Check:', {
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
  SESSION_SECRET: process.env.SESSION_SECRET ? '✅ Set' : '❌ Missing',
  MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'
});

const app = express();
const PORT = process.env.PORT || 5000
const server= createServer(app);

//middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://vikrantev.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Cookie',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Set-Cookie'],
}));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    authenticated: req.isAuthenticated ? req.isAuthenticated() : false,
    user: req.user ? { 
      id: req.user._id, 
      email: req.user.email, 
      needsPasswordSetup: req.user.needsPasswordSetup,
      isNewRegistration: req.user.isNewRegistration 
    } : null,
    sessionID: req.sessionID,
    userAgent: req.get('User-Agent') ? req.get('User-Agent').substring(0, 50) + '...' : 'Unknown'
  });
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET, 
  name: 'sessionId', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600, 
    ttl: 24 * 60 * 60, 
    autoRemove: 'native', 
    // Retry connection
    retries: 3,
    retryDelayMs: 100
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true, 
    maxAge: 24 * 60 * 60 * 1000, 
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  },
}));


app.use((req, res, next) => {
  console.log(`🔍 [${req.method}] ${req.url}`, {
    sessionID: req.sessionID,
    hasCookies: !!req.headers.cookie,
    cookies: req.headers.cookie,
    isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false
  });
  next();
});
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth',authroute);
app.use('/service',serviceRoute)
app.use('/api/contact-us',contactroute);
app.use('/api/chat',chatroute);
//home route
app.get('/',(req,res)=>{
    res.send("This is the home page");
})

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated() || req.user.needsPasswordSetup) {
    return res.redirect(`${process.env.FRONTEND_URL || 'https://vikrantev.vercel.app'}/login`);
  }
  
  res.json({
    message: `Welcome to your dashboard, ${req.user.name}!`,
    user: req.user
  });
});


server.listen(PORT ,()=>{
    console.log(`server is running on port ${PORT}`);
})