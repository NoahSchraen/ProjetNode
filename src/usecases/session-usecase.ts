import { Repository } from "typeorm";
import { Session } from "../database/entities/session.js";
import { Movie } from "../database/entities/movie.js";
import { Room } from "../database/entities/room.js";

export class SessionUsecase {

    constructor( private sessionRepo: Repository<Session>,private movieRepo: Repository<Movie>,private roomRepo: Repository<Room> ) {}

    async list() {
        return this.sessionRepo.find({ relations: { movie: true, room: true } });
    }

    async create(data: any) {

        const movie = await this.movieRepo.findOneBy({ id: data.movieId });

        const room = await this.roomRepo.findOneBy({ id: data.roomId });

        if (!movie || !room) { return null; }

        const session = this.sessionRepo.create({ movie, room, startTime: data.startTime, endTime: data.endTime });

        return this.sessionRepo.save(session);
    }

    async update(id: number, data: any) {

        const session = await this.sessionRepo.findOneBy({ id });

        if (!session) { return null; }

        Object.assign(session, data);

        return this.sessionRepo.save(session);
    }

    async delete(id: number) {

        const session = await this.sessionRepo.findOneBy({ id });

        if (!session) { return null; }

        await this.sessionRepo.remove(session);

        return true;
    }
}