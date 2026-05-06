import { Request, Response } from "express";
import { AppDataSource } from "../database/database.js";
import { User } from "../database/entities/user.js";
import { Token } from "../database/entities/token.js";
import { AuthUsecase } from "../usecases/auth-usecase.js";
import { LoginValidator, RegisterValidator } from "./validators/auth-validator.js";
import { generateValidationErrorMessage } from "./validators/utils.js";

const authUsecase = new AuthUsecase(
    AppDataSource.getRepository(User),
    AppDataSource.getRepository(Token)
);

export const Register = async (req: Request, res: Response) => {
    const { error, value } = RegisterValidator.validate(req.body);
    if (error) {
        return res.status(400).json(generateValidationErrorMessage(error.details));
    }
    const user = await authUsecase.register(value.email, value.password);
    if (!user) {
        return res.status(409).json({ error: "Email déjà utilisé" });
    }
    return res.status(201).json(user);
};

export const Login = async (req: Request, res: Response) => {
    const { error, value } = LoginValidator.validate(req.body);
    if (error) {
        return res.status(400).json(generateValidationErrorMessage(error.details));
    }
    const result = await authUsecase.login(value.email, value.password);
    if (!result) {
        return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }
    return res.json(result);
};

export const Logout = async (req: Request, res: Response) => {
    await authUsecase.logout(req.user!.userId);
    return res.json({ message: "Déconnexion réussie" });
};

export const RefreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token manquant" });
    }

    const result = await authUsecase.refreshToken(refreshToken);

    if (!result) {
        return res.status(403).json({ error: "Refresh token invalide ou expiré" });
    }

    return res.json(result);
};
