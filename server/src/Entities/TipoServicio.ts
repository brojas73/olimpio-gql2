import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoServicio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tipo_servicio!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number
}
