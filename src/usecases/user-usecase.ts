import { Repository } from "typeorm";
import { User } from "../database/entities/user.js";
import { Transaction, TransactionType } from "../database/entities/transaction.js";

export class UserUsecase {
    constructor(
        private userRepo: Repository<User>,
        private transactionRepo: Repository<Transaction>
    ) {}

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

    async depositMoney(userId: number, compte: number) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (user == null){
            return null;
        }

        user.argent += compte;
        const updatedUser = await this.userRepo.save(user);
        
        const transaction = this.transactionRepo.create({
            amount: compte,
            type: TransactionType.DEPOT,
            user: updatedUser
        });
        await this.transactionRepo.save(transaction);

        return updatedUser;
    }
}