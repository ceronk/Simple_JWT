import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
    versionKey: false,
  } 
);

//encryptPassword could be any kind of name
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);//apply algorithm 10 times
  return bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = model("User", userSchema);