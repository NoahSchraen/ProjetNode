import { AppDataSource } from "../../config/db";
import { Room } from "./room.model";

const roomRepo = AppDataSource.getRepository(Room);

export async function createRoom(data: Partial<Room>) {
  if (data.capacity! < 15 || data.capacity! > 30) {
    throw new Error("la capacité doit être entre 15 et 30");
  }

  const room = roomRepo.create(data);
  return await roomRepo.save(room);
}

export async function getRooms() {
  return await roomRepo.find();
}