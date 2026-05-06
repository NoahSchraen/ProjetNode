import { Request, Response } from "express";
import { AppDataSource } from "../database/database.js";
import { Transaction } from "../database/entities/transaction.js";
import { TransactionUsecase } from "../usecases/transaction-usecase.js";

const transactionUsecase = new TransactionUsecase(AppDataSource.getRepository(Transaction));

export const GetMyHistory = async (req: Request, res: Response) => {
    const history = await transactionUsecase.getUserHistory(req.user!.userId);
    return res.json(history);
};

export const GetAllTransactions = async (req: Request, res: Response) => {
    const history = await transactionUsecase.getAllHistory();
    return res.json(history);
};