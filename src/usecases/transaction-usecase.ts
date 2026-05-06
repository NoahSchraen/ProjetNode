import { Repository } from "typeorm";
import { Transaction } from "../database/entities/transaction.js";

export class TransactionUsecase {
    constructor(private transactionRepo: Repository<Transaction>) {}

    async getUserHistory(userId: number) {
        return await this.transactionRepo.find({
            where: { user: { id: userId } },
            order: { createdAt: "DESC" } 
        });
    }

    async getAllHistory() {
        return await this.transactionRepo.find({
            relations: ["user"], 
            order: { createdAt: "DESC" }
        });
    }
}