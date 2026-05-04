import "reflect-metadata";
import { DataSource } from "typeorm";
import { Room } from "../modules/room/room.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "cinema",
  password: "cinema",
  database: "cinema_db",
  synchronize: true,
  logging: false,
  entities: [Room],
});

