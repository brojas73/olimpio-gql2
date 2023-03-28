import { gql } from '@apollo/client'

export const ACTUALIZA_TAREA_EXTERNA_ESTADO = gql`
    mutation ActualizaTareaExternaEstado(
        $id_tarea_externa: ID!, 
        $id_estado_tarea: ID!, 
        $id_modificado_por: ID!
    ) {
        actualizaTareaExternaEstado(
            id_tarea_externa: $id_tarea_externa, 
            id_estado_tarea: $id_estado_tarea, 
            id_modificado_por: $id_modificado_por
        ) {
            id_tarea_externa
            estado_tarea {
                id_estado_tarea
            }
        }
    }
`
export const BORRA_TAREA_EXTERNA = gql`
    mutation BorraTareaExterna(
        $id_tarea_externa: ID!
    ) {
        borraTareaExterna(
            id_tarea_externa: $id_tarea_externa
        ) {
            id_tarea_externa
        }
    }
`

export const CREA_TAREA_EXTERNA = gql`
    mutation CreaTareaExterna(
        $id_sucursal_origen: ID!, 
        $ticket: String!, 
        $descripcion: String!,
        $id_tipo_trabajo: ID!,
        $id_sucursal_destino: ID!,
        $fecha_requerida: String!,
        $hora_requerida: String!,
        $id_tipo_servicio: ID!,
        $id_estado_tarea: ID!,
        $id_usuario: ID! 
    ) {
        creaTareaExterna(
            id_sucursal_origen: $id_sucursal_origen,
            ticket: $ticket,
            descripcion: $descripcion,
            id_tipo_trabajo: $id_tipo_trabajo,
            id_sucursal_destino: $id_sucursal_destino,
            fecha_requerida: $fecha_requerida,
            hora_requerida: $hora_requerida,
            id_tipo_servicio: $id_tipo_servicio,
            id_estado_tarea: $id_estado_tarea,
            id_usuario: $id_usuario
        ) {
            id_tarea_externa
            ticket
            descripcion
            estado_tarea {
                id_estado_tarea
                nombre
            }
            sucursal_origen {
                id_sucursal
                nombre
            }
            sucursal_destino {
                id_sucursal
                nombre
            }
            fecha_creacion
            creado_por {
                nombre
            }
            tipo_trabajo {
                nombre
            }
            tipo_servicio {
                id_tipo_servicio
                nombre
            }
            fecha_requerida
            hora_requerida
        }
    }
`
