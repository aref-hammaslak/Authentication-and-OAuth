
import dotenv from 'dotenv';
import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.mongo.js';

dotenv.config();




const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
}

const AUTH_OOTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}

async function verifyCallback(accessToken, refreshToken, porfile, done) {
  
  const userEmail = porfile.emails[0].value

  try {

    let user = await User.findOne({
      email: userEmail,
      auth_strategy: 'google'
    }).lean();

    if (!user) {
      const newUser = new User({
        name: porfile.displayName,
        email: userEmail,
        auth_strategy: 'google'
      })
      await newUser.save();
      console.log('The new user created successfully!');
      user = newUser;

    }

    const token = jwt.sign(porfile,
      process.env.JWT_KEY_1,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours

      });


    done(null, token);
  } catch (error) {

    console.error(error);
  }

}

passport.use(new Strategy(AUTH_OOTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((token, done) => {
  done(null, token);
})

// Readd the session from the cookie
passport.deserializeUser((token, done) => {
  done(null, token);
})

export {
  passport
}