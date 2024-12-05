import jwt from 'jsonwebtoken';

function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.user;
  if (!isLoggedIn) {
    return res.redirect('/login');
    // return res.status(401).json({
    //   message: 'you are not logged in'
    // })
  }
  next();
  
}

const verifyToken = (req, res, next) => {
  let token = req.session?.passport?.user;

  if(!token) {
    return next();
  }
  else{
      jwt.verify(token,
    process.env.JWT_KEY_1,
    (err, decoded) => {
      if(err) return next();
      req.user = decoded;
      return next();
    });
  }
};



export {
  checkLoggedIn,
  verifyToken,
}