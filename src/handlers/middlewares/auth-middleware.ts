import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../../database/entities/user.js";

export interface JwtPayload {
    userId: number;
    email: string;
    role: UserRole;
}

declare global { namespace Express { interface Request { user?: JwtPayload; }}}

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { return res.status(401).json({ error: "Token manquant" }); }
    const token = authHeader.split(" ")[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
        next();
    } catch {
        return res.status(403).json({ error: "Token invalide" });
    }
};

export const RequireRole = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) { return res.status(401).json({ error: "Non connecté" }); }
        if (!roles.includes(req.user.role)) { return res.status(403).json({ error: "Accès refusé" }); }
        next();
    };
};
