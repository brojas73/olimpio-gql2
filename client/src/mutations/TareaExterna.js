// import { gql } from '@apollo/client'
import { getUrlApis } from '../components/comun/utils'
import { STATUS_TAREA } from "../context/TareasExternasContext"

// export const ACTUALIZA_TAREA_EXTERNA_ESTADO = gql`
//     mutation ActualizaTareaExternaEstado(
//         $id_tarea_externa: ID!, 
//         $id_estado_tarea: ID!, 
//         $id_modificado_por: ID!
//     ) {
//         actualizaTareaExternaEstado(
//             id_tarea_externa: $id_tarea_externa, 
//             id_estado_tarea: $id_estado_tarea, 
//             id_modificado_por: $id_modificado_por
//         ) {
//             id_tarea_externa
//             estado_tarea {
//                 id_estado_tarea
//             }
//         }
//     }
// `
// export const BORRA_TAREA_EXTERNA = gql`
//     mutation BorraTareaExterna(
//         $id_tarea_externa: ID!
//     ) {
//         borraTareaExterna(
//             id_tarea_externa: $id_tarea_externa
//         ) {
//             id_tarea_externa
//         }
//     }
// `

// export const CREA_TAREA_EXTERNA = gql`
//     mutation CreaTareaExterna(
//         $id_sucursal_origen: ID!, 
//         $ticket: String!, 
//         $descripcion: String!,
//         $id_tipo_trabajo: ID!,
//         $id_sucursal_destino: ID!,
//         $fecha_requerida: String!,
//         $hora_requerida: String!,
//         $id_tipo_servicio: ID!,
//         $id_estado_tarea: ID!,
//         $id_usuario: ID! 
//     ) {
//         creaTareaExterna(
//             id_sucursal_origen: $id_sucursal_origen,
//             ticket: $ticket,
//             descripcion: $descripcion,
//             id_tipo_trabajo: $id_tipo_trabajo,
//             id_sucursal_destino: $id_sucursal_destino,
//             fecha_requerida: $fecha_requerida,
//             hora_requerida: $hora_requerida,
//             id_tipo_servicio: $id_tipo_servicio,
//             id_estado_tarea: $id_estado_tarea,
//             id_usuario: $id_usuario
//         ) {
//             id_tarea_externa
//             ticket
//             descripcion
//             estado_tarea {
//                 id_estado_tarea
//                 nombre
//             }
//             sucursal_origen {
//                 id_sucursal
//                 nombre
//             }
//             sucursal_destino {
//                 id_sucursal
//                 nombre
//             }
//             fecha_creacion
//             creado_por {
//                 nombre
//             }
//             tipo_trabajo {
//                 nombre
//             }
//             tipo_servicio {
//                 id_tipo_servicio
//                 nombre
//             }
//             fecha_requerida
//             hora_requerida
//         }
//     }
// `

export async function creaTareaExterna(tareaExterna) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-externas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tareaExterna)
        })

        if (!response.ok) {
            const mensaje = `Ocurrió un error: ${response.status}`
            throw new Error(mensaje)
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

export async function borraTareaExterna({id_tarea_externa}) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-externas/${id_tarea_externa}`, {
            method: 'DELETE',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_tarea_externa })
        })

        if (!response.ok) {
            const mensaje = `Ocurrió un error: ${response.status}`
            throw new Error(mensaje)
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

export async function actualizaEstadoTareaExterna({id_tarea_externa, id_estado_tarea, id_usuario}) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-externas/${id_tarea_externa}/${id_estado_tarea}/${id_usuario}`, {
            method: 'PUT',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_tarea_externa, id_estado_tarea, id_usuario })
        })

        if (!response.ok) {
            const mensaje = `Ocurrió un error: ${response.status}`
            throw new Error(mensaje)
        }

        const data = await response.json()
        let mensaje = ''
        switch (id_estado_tarea) {
            case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
                mensaje = 'Tarea recolectada para atenderse con éxito'
                break
            case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
                mensaje = 'Tarea recibida con éxito'
                break
            case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
                mensaje = 'Tarea terminada con éxito'
                break
            case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
                mensaje = 'Tarea recolectada para entrega con éxito'
                break
            case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
                mensaje = 'Tarea entregada en sucursal origen con éxito'
                break
            case STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN:
                mensaje = 'Tarea recibida en sucursal origen con éxito'
                break
            default:
                mensaje = 'Tarea actualizada con éxito'
                break
        }
        data.mensaje = mensaje
        return data
    } catch (err) {
        console.log(err)
    }
}

export async function redireaccionaTareaExterna({id_tarea_externa, id_sucursal_destino, id_usuario}) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-externas/${id_tarea_externa}/${id_sucursal_destino}/${id_usuario}`, {
            method: 'PUT',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_tarea_externa, id_sucursal_destino, id_usuario })
        })

        if (!response.ok) {
            const mensaje = `Ocurrió un error: ${response.status}`
            throw new Error(mensaje)
        }

        const data = await response.json()
        data.mensaje = 'La tarea se redireccionó con éxito'
        return data
    } catch (err) {
        console.log(err)
    }
}


