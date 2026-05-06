import { AppDataSource } from "./database.js";
import { Ticket } from "./entities/ticket.js";
import { User } from "./entities/user.js";
import { Session } from "./entities/session.js";

export const createTickets = async () => {

    const ticketRepo = AppDataSource.getRepository(Ticket);

    const tickets = await ticketRepo.find();

    if (tickets.length > 0) { return;  }

    const userRepo = AppDataSource.getRepository(User);

    const sessionRepo = AppDataSource.getRepository(Session);

    const users = await userRepo.find();

    const sessions = await sessionRepo.find();

    if (users.length === 0 || sessions.length === 0) {return; }

    const ticket = ticketRepo.create({
        user: users[0],
        session: sessions[0],
        type: "SIMPLE",
        isUsed: false
    });

    await ticketRepo.save(ticket);

    console.log("Tickets créés");
};