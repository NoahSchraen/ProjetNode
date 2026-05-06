import express from "express";
import { ListMovies, GetMovie, CreateMovie, UpdateMovie, DeleteMovie} from "../handlers/movie-handler.js";
import { RequireRole } from "../handlers/middlewares/auth-middleware.js";
import { UserRole } from "../database/entities/user.js";
export const movieRoutes = express.Router();

movieRoutes.get("/", ListMovies);
movieRoutes.get("/:id", GetMovie);
movieRoutes.post( "/", RequireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), CreateMovie);
movieRoutes.put( "/:id", RequireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), UpdateMovie);
movieRoutes.delete( "/:id", RequireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), DeleteMovie);
