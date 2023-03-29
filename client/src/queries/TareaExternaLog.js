import { gql } from '@apollo/client'
import { fetchData, getUrlApis } from '../components/comun/utils'

export const GET_TAREAS_EXTERNAS_LOG = gql`
    query TareasExternasLog {
        tareasExternasLog  {
            id_tarea_externa_log
            tarea_externa {
                id_tarea_externa
                sucursal_origen {
                    id_sucursal
                    nombre
                }
                ticket
                descripcion
            }
            tipo_accion {
                id_tipo_accion
                nombre
            }
            fecha
            usuario {
                nombre
            }
            estado_tarea_fin {
                nombre
            }
            estado_tarea_ini {
                nombre
            }
        }
    }
`

export async function fetchTareasExternasLog() {
    try {
        return await fetchData(`${getUrlApis()}/tareas-externas-log`)
    } catch (error) {
        throw error
    }
}

