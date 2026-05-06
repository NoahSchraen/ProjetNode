import { Request, Response } from "express";
import { AppDataSource } from "../database/database.js";
import { Room } from "../database/entities/room.js";
import { UserRole } from "../database/entities/user.js";
import { BusinessRuleError, ResourceNotFoundError } from "../usecases/error.js";
import { RoomUsecase } from "../usecases/room-usecase.js";
import { CreateRoomValidator, UpdateRoomValidator } from "./validators/room-validator.js";
import { generateValidationErrorMessage } from "./validators/utils.js";

const roomUsecase = new RoomUsecase( AppDataSource.getRepository(Room) );

export const ListRooms = async (req: Request, res: Response) => {

    const isAdmin = req.user?.role === UserRole.ADMIN || req.user?.role === UserRole.SUPER_ADMIN;

    const rooms = await roomUsecase.list(isAdmin);
    
    return res.json(rooms);
};

export const GetRoom = async (req: Request, res: Response) => {
    try {
        const room = await roomUsecase.getById(Number(req.params.id));
        return res.json(room);
    } catch (error) {
        return res.status(404).json({ error: "Salle introuvable" });
    }
};

export const CreateRoom = async (req: Request, res: Response) => {
    const { error, value } = CreateRoomValidator.validate(req.body);
    if (error) {
        return res.status(400).json(generateValidationErrorMessage(error.details));
    } try {
        const room = await roomUsecase.create(value);
        return res.status(201).json(room);
    } catch (error) {
        if (error instanceof BusinessRuleError) {
            return res.status(400).json({ error: error.message });
        } throw error;
    }
};

export const UpdateRoom = async (req: Request, res: Response) => {
    const { error, value } = UpdateRoomValidator.validate(req.body);
    if (error) {
        return res.status(400).json(generateValidationErrorMessage(error.details));
    }
    try {
        const room = await roomUsecase.update(Number(req.params.id), value);
        return res.json(room);
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return res.status(404).json({ error: error.message });
        }
        if (error instanceof BusinessRuleError) {
            return res.status(400).json({ error: error.message });
        } throw error;
    }
};

export const DeleteRoom = async (req: Request, res: Response) => {
    try {
        await roomUsecase.delete(Number(req.params.id));
        return res.json({ message: "Salle supprimée" });
    } catch {
        return res.status(404).json({ error: "Salle introuvable" });
    }
};

export const SetMaintenance = async (req: Request, res: Response) => {
    try {
        const room = await roomUsecase.setMaintenance(
            Number(req.params.id),
            req.body.inMaintenance === true
        ); return res.json(room);
    } catch {
        return res.status(404).json({ error: "Salle introuvable" });
    }
};
