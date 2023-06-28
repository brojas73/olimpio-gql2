import { getUrlApis } from '../components/comun/utils'
import { STATUS_TAREA_LOCAL } from "../context/TareasLocalesContext"

export async function creaTareaLocal(tareaLocal) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-locales`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tareaLocal)
        })


        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export async function borraTareaLocal({id_tarea_local}) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-locales/${id_tarea_local}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_tarea_local })
        })

        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const json = await response.json()
        const { data } = json
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export async function actualizaEstadoTareaLocal({id_tarea_local, id_estado_tarea, id_usuario}) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-locales/${id_tarea_local}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_tarea_local, id_estado_tarea, id_usuario })
        })

        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        let mensaje = ''
        switch (id_estado_tarea) {
            case STATUS_TAREA_LOCAL.POR_ATENDERSE:
                mensaje = 'Tarea creada con éxito'
                break
            case STATUS_TAREA_LOCAL.TERMINADO:
                mensaje = 'Tarea terminada con éxito'
                break
            default:
                mensaje = 'Tarea actualizada con éxito'
                break
        }
        data.mensaje = mensaje
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export async function redireccionaTareaLocal(tareaLocal) {
    try {
        const response = await fetch(`${getUrlApis()}/tareas-locales/${tareaLocal.id_tarea_local}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...tareaLocal, id_estado_tarea: STATUS_TAREA_LOCAL.REDIRECCIONADO, tipo_accion: 'redireccion'})
        })

        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

