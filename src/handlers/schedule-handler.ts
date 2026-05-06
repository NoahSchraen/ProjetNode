import { Request, Response } from "express";

import { AppDataSource } from "../database/database.js";
import { Session } from "../database/entities/session.js";
import { ScheduleUsecase } from "../usecases/schedule-usecase.js";
import { ScheduleValidator } from "./validators/schedule-validator.js";
import { generateValidationErrorMessage } from "./validators/utils.js";

const scheduleUsecase = new ScheduleUsecase( AppDataSource.getRepository(Session));

const getDates = (req: Request, res: Response) => { const { error, value } = ScheduleValidator.validate(req.query);

    if (error) { res.status(400).json( generateValidationErrorMessage(error.details) );
        return null;
    }

    return { from: new Date(value.from), to: new Date(value.to) };};

export const GetCinemaSchedule = async ( req: Request, res: Response ) => {

    const dates = getDates(req, res);

    if (!dates) { return; }

    const schedule = await scheduleUsecase.getCinemaSchedule( dates.from, dates.to );

    return res.json(schedule);
};

export const GetRoomSchedule = async ( req: Request, res: Response ) => {

    const dates = getDates(req, res);

    if (!dates) { return; }

    const schedule = await scheduleUsecase.getRoomSchedule( Number(req.params.id), dates.from, dates.to );

    return res.json(schedule);
};

export const GetMovieSchedule = async ( req: Request, res: Response ) => {

    const dates = getDates(req, res);

    if (!dates) { return; }

    const schedule = await scheduleUsecase.getMovieSchedule( Number(req.params.id), dates.from, dates.to );

    return res.json(schedule);
};
