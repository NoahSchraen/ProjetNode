import { AppDataSource } from "./database.js";
import { Session } from "./entities/session.js";
import { Movie } from "./entities/movie.js";
import { Room } from "./entities/room.js";

export const createSessions = async () => {

    const sessionRepo = AppDataSource.getRepository(Session);

    const sessions = await sessionRepo.find();

    if (sessions.length > 0) { return; }

    const movieRepo = AppDataSource.getRepository(Movie);

    const roomRepo = AppDataSource.getRepository(Room);

    const movies = await movieRepo.find();

    const rooms = await roomRepo.find();

    if (movies.length === 0 || rooms.length === 0) { return; }

    const session1 = sessionRepo.create({
        movie: movies[0],
        room: rooms[0],
        startTime: new Date("2026-06-01T18:00:00"),
        endTime: new Date("2026-06-01T21:30:00")
    });

    const session2 = sessionRepo.create({
        movie: movies[1],
        room: rooms[1],
        startTime: new Date("2026-06-02T20:00:00"),
        endTime: new Date("2026-06-02T23:00:00")
    });

    await sessionRepo.save(session1);
    await sessionRepo.save(session2);

    console.log("Séances créées");
};