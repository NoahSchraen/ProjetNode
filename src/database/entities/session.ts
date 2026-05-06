import { Column, Entity, ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import { Movie } from "./movie.js";
import { Room } from "./room.js";

@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Movie)
    movie!: Movie;

    @ManyToOne(() => Room)
    room!: Room;

    @Column()
    startTime!: Date;

    @Column()
    endTime!: Date;
}
