import express, { Router } from "express";
import { signup, signin, logout } from "../controllers/auth.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = Router();

// REGISTER
router.post("/signup", signup);
// SIGN IN
router.post("/signin", signin);
// GOODLE AUTH
router.post("/google");
// LOGOUT
router.post("/logout", logout);

export default router;
