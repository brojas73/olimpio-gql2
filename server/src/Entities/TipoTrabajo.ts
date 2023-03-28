import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoTrabajo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tipo_trabajo!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number
}
