import Router from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { data } from '../config.js';
import { verifyToken } from './verifytoken.js';

const router = Router();

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await new User({
    username: username,
    password: password,
    email: email
  });
  user.password = await user.encryptPassword(user.password);
  await user.save();
  //creates a token
  const token = jwt.sign({ id: user._id }, data.secret, {
    expiresIn: 60 * 60 * 24
  });
  res.json({ auth: true, token: token });
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ "message": "The email does not exist" });
  }
  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    return res.status(401).json({ auth: false, token: null });
  }
  const token = jwt.sign({ id: user._id }, data.secret, {
    expiresIn: 60 * 60 * 24
  });
  res.json({ auth: true, token: token });
});

router.get("/profile", verifyToken, async (req, res, next) => {
  const user = await User.findById(req.userId, {
    password: 0,
    _id: 0
  });
  if (!user) {
    res.status(404).json({ "message": "User not found" });
  }
  res.json(user);
});

export default router;