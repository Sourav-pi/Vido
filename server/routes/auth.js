import express, { Router } from "express";
import { signup, signin } from "../controllers/auth.js";

const router = Router();

// REGISTER
router.post("/signup", signup);
// SIGN IN
router.post("/signin", signin);
// GOODLE AUTH
router.post("/google");

export default router;
