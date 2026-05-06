import { Request, Response } from "express";
import { SessionUsecase } from "../usecases/session-usecase.js";

export const ListSessions = async ( req: Request, res: Response) => {return res.json([]);};

export const CreateSession = async ( req: Request, res: Response) => {

    return res.status(201).json({ message: "Séance créée" });
};

export const UpdateSession = async ( req: Request, res: Response) => {

    return res.json({ message: "Séance modifiée" });
};

export const DeleteSession = async ( req: Request, res: Response) => {

    return res.json({ message: "Séance supprimée" });
};
