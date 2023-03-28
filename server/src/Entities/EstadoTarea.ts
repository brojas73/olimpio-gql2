import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstadoTarea extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_estado_tarea!: number

    @Column()
    nombre!: string

    @Column()
    url!: string

    @Column()
    estado!: number
}
