import { User } from "./user.mongo.js";
import bcrypt from "bcryptjs";


const addNewUser = async (user) => {
  try {
    await User.updateOne(
      { email: user.email },
      {
        name: user.name,
        email: user.email,
        auth_strategy: user.auth_strategy,
        password: bcrypt.hashSync(user.password, 8)
      },
      { upsert: true },
    )
  }
  catch (e) {
    throw new Error(e.ErrorMessage);
  }

}

const emailAlreadyExists = async (user) => {

  const userExists = await findUserByEmail(user.email) && true;
  return userExists;
}

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
}


export {
  addNewUser,
  emailAlreadyExists,
  findUserByEmail
}