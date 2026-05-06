import { NextFunction, Request, Response } from "express";

export const NotFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({ error: "Route introuvable" });
};

export const ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur" });
};
