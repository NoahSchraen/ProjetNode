import express from "express";

import roomRoutes from "./modules/room/room.route";

const app = express();

app.use(express.json());

app.use("/rooms", roomRoutes);

export default app;