import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoAccion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tipo_accion!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number
}
