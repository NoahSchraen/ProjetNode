import express from "express";
import { Login, Logout, RefreshToken, Register } from "../handlers/auth-handler.js";
import { AuthMiddleware } from "../handlers/middlewares/auth-middleware.js";

export const authRoutes = express.Router();

authRoutes.post("/register", Register);
authRoutes.post("/login", Login);
authRoutes.post("/logout", AuthMiddleware, Logout);
authRoutes.post("/refresh", RefreshToken);