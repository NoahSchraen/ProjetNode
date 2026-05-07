import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";

import { Token } from "./token.js";

export enum UserRole {
    CLIENT = "CLIENT",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
        unique: true
    })
    email!: string;

    @Column({
        type: "varchar"
    })
    password!: string;

    @Column({
        type: "varchar",
        default: UserRole.CLIENT
    })
    role!: UserRole;

    @Column({
        type: "float",
        default: 0
    })
    argent!: number;

    @OneToMany(() => Token, token => token.user)
    tokens!: Token[];
}