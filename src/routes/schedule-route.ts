import express from "express";

import { GetCinemaSchedule } from "../handlers/schedule-handler.js";

export const scheduleRoutes = express.Router();

scheduleRoutes.get("/schedule", GetCinemaSchedule);
