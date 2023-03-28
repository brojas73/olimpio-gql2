import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_usuario!: number

    @Column({ unique: true})
    usuario!: string

    @Column()
    nombre!: string

    @Column()
    contrasena!: string

    @Column({unique: true})
    email!: string

    @Column()
    id_rol!: number

    @Column()
    estado!: number
}
