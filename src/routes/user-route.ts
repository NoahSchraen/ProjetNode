import express from "express";
import { Profil, ListUsers, Depot } from "../handlers/user-handler.js";
import { AuthMiddleware, RequireRole } from "../handlers/middlewares/auth-middleware.js";
import { UserRole } from "../database/entities/user.js";

export const userRoutes = express.Router();

userRoutes.get("/me", AuthMiddleware, Profil);
userRoutes.post("/me/deposit", AuthMiddleware, Depot);
userRoutes.get("/", AuthMiddleware, RequireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), ListUsers);