import Route from "express";
import { getFav, addFav, removeFav } from "../controllers/favController";

const router = Route();

router.get("/", getFav);
router.post("/add/", addFav);
router.delete("/remove/:pokemonName", removeFav);
