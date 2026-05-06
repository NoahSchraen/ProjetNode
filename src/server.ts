import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./database/database.js";
import { authRoutes } from "./routes/auth-route.js";
import { roomRoutes } from "./routes/room-route.js";
import { movieRoutes } from "./routes/movie-routes.js";
import { AuthMiddleware } from "./handlers/middlewares/auth-middleware.js";
import { ErrorMiddleware, NotFoundMiddleware } from "./handlers/middlewares/error-middleware.js";
import { LoggerMiddleware } from "./handlers/middlewares/logger-middleware.js";

const app = express();

app.use(express.json());
app.use(LoggerMiddleware);
app.use("/auth", authRoutes);
app.use("/rooms", AuthMiddleware, roomRoutes);
app.use("/movies", AuthMiddleware, movieRoutes);
app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

AppDataSource.initialize().then(() => {
    app.listen(3000, () => { console.log("Serveur lancé sur http://localhost:3000"); });
});
