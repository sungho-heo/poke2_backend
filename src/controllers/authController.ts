import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const signup = async (req: Request, res: Response) => {
  const { nickname, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // password 저장시 해시 함수를 거쳐서 해시코드로 저장이 되게끔함.
    const handlePassword = await bcrypt.hash(password, 10);
    const user = new User({ nickname, email, password: handlePassword });
    await user.save();

    // token 생성시간
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      // token time limit
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// login

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invaild User" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invaild password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
