import express from "express";
import * as ticketController from "./ticket.controller";

const router = express.Router();

router.get("/", ticketController.getTicket);
router.post("/", ticketController.createTicket);
router.post("/billeterie", ticketController.utiliserTicket);

export default router;
