import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  film!: string;

  @Column({ default: Date.now })
  seance!: Date;

  @Column({ default: false })
  isUtiliser!: boolean;
}
