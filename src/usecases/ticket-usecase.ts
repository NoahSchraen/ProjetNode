import { Repository } from "typeorm";
import { Ticket } from "../database/entities/ticket.js";
import { User } from "../database/entities/user.js";
import { Session } from "../database/entities/session.js";

export class TicketUsecase {

    constructor(
        private ticketRepo: Repository<Ticket>,
        private userRepo: Repository<User>,
        private sessionRepo: Repository<Session>
    ) {}

    async createTicket(data: any) {

        const user = await this.userRepo.findOneBy({ id: data.userId });

        const session = await this.sessionRepo.findOneBy({ id: data.sessionId });

        if (!user || !session) { return null; }

        const ticket = this.ticketRepo.create({ user, session, type: data.type || "SIMPLE" });

        return this.ticketRepo.save(ticket);
    }

    async getTickets(userId: number) {

        return this.ticketRepo.find({
            where: { user: { id: userId } },
            relations: { session: true  } });
    }

    async useTicket(ticketId: number) {

        const ticket = await this.ticketRepo.findOneBy({ id: ticketId });

        if (!ticket) { return null; }

        ticket.isUsed = true;

        return this.ticketRepo.save(ticket);
    }
}
