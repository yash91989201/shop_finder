import express from "express";
import auth from "../middleware/auth";
import { signup, login, logout, checkAuth } from "../controllers/seller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/check-auth", auth, checkAuth);

export default router;
