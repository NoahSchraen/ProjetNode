import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.js";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    value!: string;

    @ManyToOne(() => User, user => user.tokens)
    user!: User;
}