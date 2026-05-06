import express from "express";
import { GetMyHistory, GetAllTransactions } from "../handlers/transaction-handler.js";
import { AuthMiddleware, RequireRole } from "../handlers/middlewares/auth-middleware.js";
import { UserRole } from "../database/entities/user.js";

export const transactionRoutes = express.Router();

transactionRoutes.get("/me", AuthMiddleware, GetMyHistory);
transactionRoutes.get("/all", AuthMiddleware, RequireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), GetAllTransactions);