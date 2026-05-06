import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.js";

export enum TransactionType {
    DEPOT = "DEPOT",
    RETRAIT = "RETRAIT",
    ACHAT = "ACHAT"
}

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("float")
    amount!: number;

    @Column({
        type: "varchar"
    })
    type!: TransactionType;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User)
    user!: User;
}