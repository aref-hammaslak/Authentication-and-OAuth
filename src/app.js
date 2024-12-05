import express from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import helmet from 'helmet';
import passport from 'passport';
import {checkLoggedIn , verifyToken} from './middlewares/authrozation.js';
import { authRouter } from './routes/auth.root.js';

dotenv.config();

const app= express();



app.use(express.json());

app.use(helmet());
app.use(cookieSession({
  name: 'session',
  maxAge: 24*60*60*1000,
  httpOnly:true,
  signed: false,
  keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(verifyToken);


app.use(express.static(path.resolve('./public')));

app.get('/' ,  (req, res) => {
  
 
  res.sendFile(path.resolve('./public/home/home.html'));
});

app.get('/login', (req, res) => {
 
  res.sendFile(path.resolve('./public/login/login.html'));
});

app.get('/signup', (req, res) => {
 

  res.sendFile(path.resolve('./public/signup/signup.html'));
});


app.use('/auth', authRouter);

app.get('/profile',checkLoggedIn,  function(req, res){
  // res.send(`Your Profile info:\n ${JSON.stringify(req.user)}!`);
  res.send(req.user)
});

app.get('/failure', () => {
  return res.send(`your secret value is `);
})



export {
  app,

}