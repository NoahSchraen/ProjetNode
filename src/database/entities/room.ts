import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar"
    })
    name!: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    description!: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    images!: string;

    @Column({
        type: "varchar"
    })
    type!: string;

    @Column({
        type: "int"
    })
    capacity!: number;

    @Column({
        type: "boolean",
        default: false
    })
    handicapAccess!: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    inMaintenance!: boolean;
}