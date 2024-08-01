import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config.js';
import User from '../models/userModel.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).send({ message: 'User registered successfully!' });
    console.log(user);  
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ token: null, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
    res.status(200).send({ token, user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
