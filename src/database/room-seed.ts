import { AppDataSource } from "./database.js";
import { Room } from "./entities/room.js";

export const createRooms = async () => {

    const roomRepo = AppDataSource.getRepository(Room);

    const rooms = await roomRepo.find();

    if (rooms.length > 0) { return; }

    const data = [
        {
            name: "Salle 1",
            description: "Grande salle",
            images: "",
            type: "STANDARD",
            capacity: 20,
            handicapAccess: true
        },
        {
            name: "Salle 2",
            description: "Salle familiale",
            images: "",
            type: "STANDARD",
            capacity: 25,
            handicapAccess: true
        },
        {
            name: "Salle IMAX",
            description: "Salle géante",
            images: "",
            type: "IMAX",
            capacity: 30,
            handicapAccess: true
        }
    ];

    for (const roomData of data) {

        const room = roomRepo.create(roomData);

        await roomRepo.save(room);
    }

    console.log("Salles créées");
};