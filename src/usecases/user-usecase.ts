import { Repository } from "typeorm";
import { User } from "../database/entities/user.js";

export class UserUsecase {
    constructor(private userRepo: Repository<User>) {}

    async getProfile(userId: number) {
        return await this.userRepo.findOne({
            where: { id: userId },
            select: ["id", "email", "role", "argent"] 
        });
    }

    async listAllUsers() {
        return await this.userRepo.find({
            select: ["id", "email", "role", "argent"]
        });
    }

    async depositMoney(userId: number, amount: number) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user) return null;

        user.argent += amount;
        return await this.userRepo.save(user);
    }
}