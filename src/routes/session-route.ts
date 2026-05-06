import express from "express";
import { ListSessions, CreateSession, UpdateSession, DeleteSession} from "../handlers/session-handler.js";

export const sessionRoutes = express.Router();

sessionRoutes.get("/", ListSessions);
sessionRoutes.post("/", CreateSession);
sessionRoutes.put("/:id", UpdateSession);
sessionRoutes.delete("/:id", DeleteSession);
