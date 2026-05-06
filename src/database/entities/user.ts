import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column("varchar", { unique: true })
    email!: string;

    @Column("varchar")
    password!: string;

    @Column("varchar", {
        default: UserRole.CLIENT
    })
    role!: UserRole;

    @Column("float", { default: 0 })
    argent!: number;

    @OneToMany(() => Token, token => token.user)
    tokens!: Token[];
}