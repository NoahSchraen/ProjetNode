import { AppDataSource } from "../../config/db";
import { Ticket } from "./ticket.model";

const ticketRepo = AppDataSource.getRepository(Ticket);

export async function createTicket(ticketData: Partial<Ticket>) {
  const ticket = ticketRepo.create(ticketData);
  return await ticketRepo.save(ticket);
}

export async function utiliserTicket(usedTicket: Partial<Ticket>) {
  if (usedTicket.isUtiliser == false) {
    usedTicket.isUtiliser = true;
  }
}

export async function getTicket(ticketData: Partial<Ticket>) {
  if (ticketData.isUtiliser == true) {
    return await ticketRepo.find();
  }
  return await ticketRepo.find();
}
