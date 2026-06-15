import dotenv from 'dotenv';
 
dotenv.config({ override: true });
 
export const ENV = {
  loginURL: process.env.login_URL!,
  username: process.env.login_Username!,
  password: process.env.login_Password!,
};