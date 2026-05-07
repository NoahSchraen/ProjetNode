import { DataSource } from "typeorm";

import { User } from "./entities/user.js";
import { Token } from "./entities/token.js";
import { Room } from "./entities/room.js";
import { Movie } from "./entities/movie.js";
import { Session } from "./entities/session.js";
import { Ticket } from "./entities/ticket.js";
import { Transaction } from "./entities/transaction.js";

export const AppDataSource = new DataSource({
    type: "mysql",

    host: process.env.DB_HOST || "localhost",

    port: Number(process.env.DB_PORT) || 3306,

    username: process.env.DB_USERNAME || "root",

    password: process.env.DB_PASSWORD || "root",

    database: process.env.DB_NAME || "cinema",

    synchronize: true,

    entities: [
        User,
        Token,
        Room,
        Movie,
        Session,
        Ticket,
        Transaction
    ]
});