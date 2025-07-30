import express, { Router } from "express";
import { checkAuth, login, logout, onBoard, signup } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)

authRouter.use(isAuthenticated);
authRouter.get("/me",checkAuth);
authRouter.post("/logout",logout)
authRouter.post("/onboarding",onBoard)

export default authRouter