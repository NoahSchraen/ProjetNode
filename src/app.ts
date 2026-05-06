import express from "express";

import roomRoutes from "./modules/room/room.route";
import ticketRoutes from "./modules/ticket/ticket.route";

const app = express();

app.use(express.json());

app.use("/rooms", roomRoutes);
app.use("/tickets", ticketRoutes);

export default app;
