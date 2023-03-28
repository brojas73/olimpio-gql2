import { BaseEntity, Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sucursal extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id_sucursal!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number
}

