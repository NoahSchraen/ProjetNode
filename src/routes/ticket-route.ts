import express from "express";
import { BuyTicket, MyTickets, UseTicket } from "../handlers/ticket-handler.js";

export const ticketRoutes = express.Router();

ticketRoutes.post("/buy", BuyTicket);

ticketRoutes.get("/my", MyTickets);

ticketRoutes.post("/:id/use", UseTicket);
