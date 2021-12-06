import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    title: string;

    @Column("varchar")
    description: string;

    @Column("varchar")
    status: BoardStatus;

    @ManyToOne(type => User, user => user.boards, {eager: false})
    user: User;

    @Column()
    userId: number;
}