import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    duration!: number;

    @Column()
    genre!: string;

    @Column()
    image!: string;
}
