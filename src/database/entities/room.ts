import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    name!: string;

    @Column("varchar", { nullable: true })
    description!: string;

    @Column("varchar", { nullable: true })
    images!: string;

    @Column("varchar")
    type!: string;

    @Column("int")
    capacity!: number;

    @Column("boolean", { default: false })
    handicapAccess!: boolean;

    @Column("boolean", { default: false })
    inMaintenance!: boolean;
}