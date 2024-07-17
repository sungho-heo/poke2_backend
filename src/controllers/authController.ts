import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const signup = async (req: Request, res: Response) => {
    const { nickname, email, password } = req.body;
    try {
        const checkUser = await 
    }
}