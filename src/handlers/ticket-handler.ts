import { Request, Response } from "express";
import { AppDataSource } from "../database/database.js";
import { Ticket } from "../database/entities/ticket.js";
import { User } from "../database/entities/user.js";
import { Session } from "../database/entities/session.js";
import { TicketUsecase } from "../usecases/ticket-usecase.js";

const ticketUsecase = new TicketUsecase(
    AppDataSource.getRepository(Ticket),
    AppDataSource.getRepository(User),
    AppDataSource.getRepository(Session)
);

export const BuyTicket = async ( req: Request, res: Response) => {

    const ticket = await ticketUsecase.createTicket({
        userId: req.user?.userId,
        sessionId: req.body.sessionId,
        type: req.body.type
    });

    if (!ticket) { return res.status(404).json({ error: "Utilisateur ou séance introuvable" }); }

    return res.status(201).json(ticket);
};

export const MyTickets = async ( req: Request, res: Response) => {

    const tickets = await ticketUsecase.getTickets( req.user!.userId );

    return res.json(tickets);
};

export const UseTicket = async ( req: Request, res: Response) => {

    const ticket = await ticketUsecase.useTicket( Number(req.params.id) );

    if (!ticket) { return res.status(404).json({ error: "Billet introuvable"}); }

    return res.json(ticket);
};
