import mongoose from "mongoose";

const connectionURL = process.env.MONGO_URL;

export const mongoConnection = async () => {
  try {
    await mongoose.connect(connectionURL);
    console.log('Connected to MongoDB');
  }
  catch (err){
    console.log(err);
  }
}


mongoose.connection.on('error',(er)=> {
  console.log(er);
})