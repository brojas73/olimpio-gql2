import { getUrlApis } from '../components/comun/utils'
import { STATUS_TAREA } from "../context/TareasExternasContext"

export async function creaTareaExterna(tareaExterna) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-externas`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tareaExterna)
        })


        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.log(`${err}`)
    }
}

export async function borraTareaExterna({id_tarea_externa, id_tarea_local, id_usuario, id_estado_tarea}) {
    try {
        // Si estamos borrando una tarea externa
        if (!id_tarea_local) {
            const response = await fetch(`${getUrlApis()}/tareas-externas/${id_tarea_externa}`, {
                credentials: 'include',
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_tarea_externa })
            })
    
            if (!response.ok) {
                const mensaje = `Ocurrió un error: ${response.status}`
                throw new Error(mensaje)
            }
    
            const json = await response.json()
            const { data } = json
            return data
        // Estamos borrando una tarea local, por tanto tenemos que regresar el 
        // estado de la tarea local a su estado original y borrar la tarea externa,
        // para esto, vamos a pasar como argumento del tipo de accion en el PATCH (cancelacion)
        } else {
            const response = await fetch(`${getUrlApis()}/tareas-externas/${id_tarea_externa}`, {
                credentials: 'include',
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_tarea_externa, id_tarea_local, id_usuario, id_estado_tarea, tipo_accion: 'cancelacion' })
            })
    
            if (!response.ok) {
                const mensaje = `Ocurrió un error: ${response.status}`
                throw new Error(mensaje)
            }
    
            const json = await response.json()
            const { data } = json
            data.mensaje = 'La tarea externa se canceló exitosamente'
            return data
        }
    } catch (err) {
        console.log(err)
    }
}

export async function actualizaEstadoTareaExterna({id_tarea_externa, id_estado_tarea, id_usuario}) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-externas/${id_tarea_externa}`, {
            credentials: 'include',
            method: 'PATCH',
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
            case STATUS_TAREA.REDIRECCIONADO:
                mensaje = 'Tarea desviada con éxito'
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

export async function redireccionaTareaExterna({id_tarea_externa, id_sucursal_redireccion, id_usuario}) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-externas/${id_tarea_externa}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_tarea_externa, id_sucursal_redireccion, id_estado_tarea: STATUS_TAREA.REDIRECCIONADO, id_usuario, tipo_accion: 'redireccion' })
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

export async function recolectaTareaExternaForwarded({id_tarea_externa, id_estado_tarea, id_sucursal_redireccion, id_usuario}) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-externas/${id_tarea_externa}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_tarea_externa, id_sucursal_redireccion, id_estado_tarea, id_usuario, tipo_accion: 'recolecta-redireccion' })
        })

        if (!response.ok) {
            const mensaje = `Ocurrió un error: ${response.status}`
            throw new Error(mensaje)
        }

        const data = await response.json()
        data.mensaje = 'La tarea se recolectó con éxito'
        return data
    } catch (err) {
        console.log(err)
    }
}

