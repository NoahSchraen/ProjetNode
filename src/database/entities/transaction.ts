import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

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

    @Column({
        type: "float"
    })
    amount!: number;

    @Column({
        type: "varchar"
    })
    type!: TransactionType;

    @CreateDateColumn({
        type: "datetime"
    })
    createdAt!: Date;

    @ManyToOne(() => User)
    user!: User;
}