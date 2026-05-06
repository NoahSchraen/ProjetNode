import { Request, Response } from "express";
import { AppDataSource } from "../database/database.js";
import { User } from "../database/entities/user.js";
import { UserUsecase } from "../usecases/user-usecase.js";

const userUsecase = new UserUsecase(AppDataSource.getRepository(User));

export const Profil = async (req: Request, res: Response) => {
    const user = await userUsecase.getProfile(req.user!.userId);
    return res.json(user);
};

export const ListUsers = async (req: Request, res: Response) => {
    const users = await userUsecase.listAllUsers();
    return res.json(users);
};

export const Depot = async (req: Request, res: Response) => {
    const { montant } = req.body;
    if (!montant || montant <= 0) {
        return res.status(400).json({ error: "Le montant doit être supérieur à 0" });
    }

    const updatedUser = await userUsecase.depositMoney(req.user!.userId, montant);
    return res.json({ 
        message: "Compte rechargé", 
        newBalance: updatedUser?.argent 
    });
};