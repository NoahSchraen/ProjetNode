import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    title!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({
        type: "int"
    })
    duration!: number;

    @Column({
        type: "varchar"
    })
    genre!: string;

    @Column({
        type: "varchar"
    })
    image!: string;
}