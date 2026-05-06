import express from "express";
import {CreateRoom, DeleteRoom, GetRoom, ListRooms, SetMaintenance, UpdateRoom } from "../handlers/room-handler.js";
import { RequireRole } from "../handlers/middlewares/auth-middleware.js";
import { UserRole } from "../database/entities/user.js";

export const roomRoutes = express.Router();

roomRoutes.get("/", ListRooms);
roomRoutes.get("/:id", GetRoom);
roomRoutes.post("/", RequireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), CreateRoom);
roomRoutes.put("/:id", RequireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), UpdateRoom);
roomRoutes.delete("/:id", RequireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), DeleteRoom);
roomRoutes.patch("/:id/maintenance", RequireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), SetMaintenance);
