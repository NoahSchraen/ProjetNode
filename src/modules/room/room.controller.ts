import { Request, Response } from "express";
import * as roomService from "./room.service";

export async function createRoom(req: Request, res: Response) {
  try {
    const room = await roomService.createRoom(req.body);
    res.status(201).json(room);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function getRooms(req: Request, res: Response) {
  const rooms = await roomService.getRooms();
  res.json(rooms);
}