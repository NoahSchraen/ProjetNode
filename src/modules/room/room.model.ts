import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column("text", { array: true })
  images!: string[];

  @Column()
  type!: string;

  @Column()
  capacity!: number;

  @Column({ default: false })
  hasDisabledAccess!: boolean;

  @Column({ default: false })
  isInMaintenance!: boolean;
}