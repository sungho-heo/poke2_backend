import { Router } from "express";
import { login, signup, deleteid } from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// router
router.post("/login", login);
router.post("/signup", signup);
router.delete("/deleteid", authMiddleware, deleteid);

export default router;
