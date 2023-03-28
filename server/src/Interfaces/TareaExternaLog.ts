import { EstadoTarea } from "../Entities/EstadoTarea"
import { TareaExterna } from "../Entities/TareaExterna"
import { TipoAccion } from "../Entities/TipoAccion"
import { Usuario } from "../Entities/Usuario"

export interface ITareaExternaLog  {
    id_tarea_externa_log: number
    id_tarea_externa: number
    id_tipo_accion: number
    fecha: Date
    id_usuario: number
    id_estado_tarea_ini: number
    id_estado_tarea_fin: number
}
