import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {createServer} from 'http'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import teamroute from './route/teamroute.js'
import contactroute from './route/contactroute.js'
import chatroute from './route/chatroute.js'
import connectDb from './config/database.js'
import passport from './config/passport.js'
import authroute from './route/auth.js'
dotenv.config();
connectDb();

const app = express();
const server = createServer(app);

const  PORT = process.env.PORT||5000;
//middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/your-bike-db',
    touchAfter: 24 * 3600 // Lazy session update
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth',authroute);
app.use('/api/team',teamroute)
app.use('/api/contact-us',contactroute);
app.use('/api/chat',chatroute);
//home route
app.get('/',(req,res)=>{
    res.send("This is the home page");
})

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated() || req.user.needsPasswordSetup) {
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login`);
  }
  
  res.json({
    message: `Welcome to your dashboard, ${req.user.name}!`,
    user: req.user
  });
});


server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})