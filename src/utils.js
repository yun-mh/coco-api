import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const encryptPassword = (password) => {
  return bcrypt.hash(password, 12);
};

export const decryptPassword = (enteredPassword, savedPassword) => {
  return bcrypt.compare(enteredPassword, savedPassword);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
