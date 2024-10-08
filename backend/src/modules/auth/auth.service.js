import * as usersService from '../users/users.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/email.js';

export const signUp = async req => {
  let { email, userName, password } = req.body;

  userName = userName.toLowerCase();
  email = email.toLowerCase();

  //check if email or username already exists
  const valid = await usersService.checkValidUser(email, userName);
  if (!valid.status) {
    throw new Error(valid.message, { cause: valid.cause });
  }

  //check if email is valid
  if (!(await sendEmailtoUser(req))) {
    throw new Error('Invalid to send email, please try again', { cause: 400 });
  }
  return usersService.createUser({ email, userName, password });
};

const sendEmailtoUser = async req => {
  //generate token for confirmation
  const token = jwt.sign({ email: req.body.email }, process.env.SIGNUPKEY, {
    expiresIn: '24h'
  });
  const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirm/${token}`;
  const message = `<h3>Follow the below link to confirm your email </h3> <h2><a href=${link}>Confirm<a/><h2/>`;
  const info = await sendEmail(req.body.email, 'Confirmation Email', message);
  if (info?.accepted?.length) {
    return true;
  }
  return false;
};

export const confirmEmail = async token => {
  const decoded = jwt.decode(token, process.env.SIGNUPKEY);
  if (!decoded?.email) {
    return next(Error('Invalid token', { cause: 400 }));
  }

  const user = await usersService.updateUser(
    { email: decoded.email },
    { isConfirmed: true }
  );

  if (!user) {
    return next(Error('Invalid token', { cause: 400 }));
  }
  return user;
};

export const signIn = async (userName, password) => {
  const user = await usersService.getUser(
    { userName: userName.toLowerCase() },
    'userName isDeleted isConfirmed password'
  );

  //check if userName and password not match
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password', { cause: 400 });
  }
  //check if email is confirmed
  if (!user?.isConfirmed) {
    throw new Error('Please confirm your email before login', { cause: 403 });
  }
  //check if account is active
  if (user?.isDeleted) {
    throw new Error('Account is deleted', { cause: 403 });
  }

  //create token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
    expiresIn: '12h'
  });

  return token;
};
