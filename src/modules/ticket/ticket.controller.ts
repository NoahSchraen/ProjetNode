import { Request, Response } from "express";
import * as ticketService from "./ticket.service";

export async function createTicket(req: Request, res: Response) {
  try {
    const tickets = await ticketService.createTicket(req.body);
    res.status(201).json(tickets);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function getTicket(req: Request, res: Response) {
  const tickets = await ticketService.getTicket(req.body);
  res.json(tickets);
}

export async function utiliserTicket(req: Request, res: Response) {
  const tickets = await ticketService.utiliserTicket(req.body);
  res.json(tickets);
}
