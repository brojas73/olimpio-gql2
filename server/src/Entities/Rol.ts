import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_rol!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number
}
