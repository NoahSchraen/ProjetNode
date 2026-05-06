import { Repository } from "typeorm";

import { Room } from "../database/entities/room.js";
import { BusinessRuleError, ResourceNotFoundError } from "./error.js";

export class RoomUsecase {
    constructor(private roomRepo: Repository<Room>) {}

    async list(isAdmin: boolean) {
        if (isAdmin) {
            return this.roomRepo.find();
        }

        return this.roomRepo.find({
            where: { inMaintenance: false } });
    }

    async getById(id: number) {
        const room = await this.roomRepo.findOneBy({ id });
        if (!room) {
            throw new ResourceNotFoundError("Salle introuvable");
        }
        return room;
    }

    async create(data: Partial<Room>) {
        this.checkCapacity(data.capacity);
        const room = this.roomRepo.create(data);
        return this.roomRepo.save(room);
    }

    async update(id: number, data: Partial<Room>) {
        const room = await this.getById(id);
        if (data.capacity !== undefined) {
            this.checkCapacity(data.capacity);
        }
        Object.assign(room, data);
        return this.roomRepo.save(room);
    }

    async delete(id: number) {
        const room = await this.getById(id);
        await this.roomRepo.remove(room);
    }

    async setMaintenance(id: number, inMaintenance: boolean) {
        const room = await this.getById(id);
        room.inMaintenance = inMaintenance;
        return this.roomRepo.save(room);
    }

    private checkCapacity(capacity?: number) {
        if (!capacity || capacity < 15 || capacity > 30) {
            throw new BusinessRuleError("La capacité doit être entre 15 et 30");
        }
    }
}
