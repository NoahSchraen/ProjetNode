import { Between, Repository } from "typeorm";
import { Session } from "../database/entities/session.js";

export class ScheduleUsecase {

    constructor( private sessionRepo: Repository<Session> ) {}

    async getCinemaSchedule(from: Date, to: Date) {
        return this.sessionRepo.find({
            where: { startTime: Between(from, to) },
            relations: { movie: true, room: true },
            order: {startTime: "ASC" } });
    }

    async getRoomSchedule(roomId: number, from: Date, to: Date) {
        return this.sessionRepo.find({
            where: { room: { id: roomId }, startTime: Between(from, to) },
            relations: { movie: true, room: true},
            order: { startTime: "ASC" } });
    }

    async getMovieSchedule(movieId: number, from: Date, to: Date) {
        return this.sessionRepo.find({
            where: { movie: { id: movieId }, startTime: Between(from, to) },
            relations: { movie: true, room: true  },
            order: { startTime: "ASC" } });
    }
}
