import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/db";

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log("Le serveur est lancé");
  });
});