import mongoose, { Schema , model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  auth_strategy: {
    type: String,
    enum: ['local', 'google'],
    required: true
  },
});

export const User = model('User',userSchema);