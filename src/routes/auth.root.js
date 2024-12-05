import express from "express";
import { httpAddNewUser, httpAuthorizeUser } from "../controllers/user.controller.js";
import { passport } from "../services/passport.js";


//auth rout
const router = express.Router();

router.get('/google',
  passport.authenticate('google', {
    scope: ['email','profile'],
  })
);

router.get('/google/callback',
  (req, res,next) => {
    console.log('Google calld us back')
    next();
  },
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
    session: true,
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

router.post('/signup', httpAddNewUser);

router.post('/login', httpAuthorizeUser);



export {
  router as authRouter
}