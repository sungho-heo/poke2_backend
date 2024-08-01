import { Router } from "express";
import { getFav, addFav, removeFav } from "../controllers/favController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getFav);
router.post("/add", authMiddleware, addFav);
router.delete("/remove/:pokemonName", authMiddleware, removeFav);

export default router;
