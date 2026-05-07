import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import { User } from "./user.js";
import { Session } from "./session.js";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Session)
    session!: Session;

    @Column({
        type: "boolean",
        default: false
    })
    isUsed!: boolean;

    @Column({
        type: "varchar",
        default: "SIMPLE"
    })
    type!: string;
}