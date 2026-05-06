import express from "express";
import { Login, Logout, Register } from "../handlers/auth-handler.js";
import { AuthMiddleware } from "../handlers/middlewares/auth-middleware.js";

export const authRoutes = express.Router();

authRoutes.post("/register", Register);
authRoutes.post("/login", Login);
authRoutes.post("/logout", AuthMiddleware, Logout);
