import express from "express";
import * as roomController from "./room.controller";

const router = express.Router();

router.get("/", roomController.getRooms);
router.post("/", roomController.createRoom);

export default router;