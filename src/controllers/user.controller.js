import { addNewUser, emailAlreadyExists, findUserByEmail } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const httpAddNewUser = async (req, res) => {
  try {
    const user = req.body;
    const email = user.email;
    console.log(user);
    if (!user.password || !user.name || !user.email) {
      return res.status(400).json({
        error: 'All fields are required'
      })
    }
    if (!isEmail(email)) {
      return res.status(400).json({
        error: 'Email is not valid'
      })
    }
    if (await emailAlreadyExists(user)) {
      return res.status(400).json({
        error: 'Email already exists'
      })
    }

    user.auth_strategy = 'local';
    await addNewUser(user);
    res.redirect('/login');
    // return res.status(201).send('User added successfully');
  }
  catch (err) {
    return res.status(400).send({ error: err.message });
  }
}


const isEmail = (emailAdress) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)){
    
    return true;
  }
  else return false;
    
}

const httpAuthorizeUser = async (req, res) => {
  try {
    
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        error: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user._id },
      process.env.JWT_KEY_1,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
        
      });

    req.session.passport.user = token;
    
    return res.status(200).send({
      message: 'user authorized',
    })
    // res.send({
    //   id: user._id,
    //   name: user.name,
    //   email: user.email,
    // });


  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export {
  httpAddNewUser,
  httpAuthorizeUser
}