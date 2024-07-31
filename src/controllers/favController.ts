import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

// 이미 포켓몬을 즐겨찾기한 유저의 데이터 가져오기
export const getFav = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ fav: user.fav });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 즐겨찾기 포켓몬 추가
export const addFav = async (req: AuthRequest, res: Response) => {
  const { pokemonName } = req.body;
  console.log(pokemonName);

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.fav.includes(pokemonName)) {
      user.fav.push(pokemonName);
      await user.save();
    }

    res.status(200).json({ fav: user.fav });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFav = async (req: AuthRequest, res: Response) => {
  const { pokemonName } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.fav = user.fav.filter((name) => name !== pokemonName);
    await user.save();

    res.status(200).json({ fav: user.fav });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
