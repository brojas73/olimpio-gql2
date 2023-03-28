import { gql } from '@apollo/client'

export const GET_TAREAS_EXTERNAS_ACTIVAS = gql`
    query TareasExternasActivas {
        tareasExternasActivas  {
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
                id_usuario
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

export const GET_TAREAS_EXTERNAS_ACTIVAS_BY_ORIGEN = gql`
    query TareasExternasActivasByOrigen($id_sucursal: ID!) {
        tareasExternasActivasByOrigen(id_sucursal: $id_sucursal)  {
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
                id_usuario
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

export const GET_TAREAS_EXTERNAS_ACTIVAS_BY_DESTINO = gql`
    query TareasExternasActivasByDestino($id_sucursal: ID!) {
        tareasExternasActivasByDestino(id_sucursal: $id_sucursal)  {
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
                id_usuario
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


export const GET_TAREA_EXTERNA_BY_ID = gql`
    query TareaExterna($id_tarea_externa: ID!) {
        tareaExterna(id_tarea_externa: $id_tarea_externa)  {
            ticket
            descripcion
            estado_tarea {
                nombre
            }
            sucursal_origen {
                nombre
            }
            sucursal_destino {
                nombre
            }
            fecha_creacion
            creado_por {
                id_usuario
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
