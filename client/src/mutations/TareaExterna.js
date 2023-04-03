import { getUrlApis } from '../components/comun/utils'
import { STATUS_TAREA } from "../context/TareasExternasContext"

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
            headers: { 'Content-Type': 'application/json' },
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
        const response = await fetch(`${getUrlApis()}/tareas-externas/${id_tarea_externa}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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
            headers: { 'Content-Type': 'application/json' },
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

