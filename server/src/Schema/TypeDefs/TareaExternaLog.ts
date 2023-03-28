import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

import { EstadoTarea } from '../../Entities/EstadoTarea'
import { TareaExterna } from '../../Entities/TareaExterna'
import { TipoAccion } from '../../Entities/TipoAccion'
import { Usuario } from '../../Entities/Usuario'
import { IEstadoTarea } from '../../Interfaces/EstadoTarea'
import { ITareaExterna } from '../../Interfaces/TareaExterna'
import { ITareaExternaLog } from '../../Interfaces/TareaExternaLog'
import { ITipoAccion } from '../../Interfaces/TipoAccion'
import { IUsuario } from '../../Interfaces/Usuario'
import { EstadoTareaType } from './EstadoTarea'
import { TareaExternaType } from './TareaExterna'
import { TipoAccionType } from './TipoAccion'
import { UsuarioType } from './Usuario'

export const TareaExternaLogType = new GraphQLObjectType({
    name: 'TareaExternaLog',
    fields: () => ({
        id_tarea_externa_log: { type:  GraphQLID },
        fecha: { type:  GraphQLDateTime },

        tarea_externa: {
            type: TareaExternaType,
            async resolve(parent: ITareaExternaLog, _): Promise<ITareaExterna | null> {
                return await TareaExterna.findOne({where: {id_tarea_externa: parent.id_tarea_externa}})
            }
        },

        tipo_accion: {
            type: TipoAccionType,
            async resolve(parent: ITareaExternaLog, _): Promise<ITipoAccion | null> {
                return await TipoAccion.findOne({where: {id_tipo_accion: parent.id_tipo_accion}})
            }
        },

        usuario: {
            type: UsuarioType,
            async resolve(parent: ITareaExternaLog, _): Promise<IUsuario | null> {
                return await Usuario.findOne({where: {id_usuario: parent.id_usuario}})
            }
        },

        estado_tarea_ini: {
            type: EstadoTareaType,
            async resolve(parent: ITareaExternaLog, _): Promise<IEstadoTarea | null> {
                return await EstadoTarea.findOne({where: {id_estado_tarea: parent.id_estado_tarea_ini}})
            }
        },

        estado_tarea_fin: {
            type: EstadoTareaType,
            async resolve(parent: ITareaExternaLog, _): Promise<IEstadoTarea | null> {
                return await EstadoTarea.findOne({where: {id_estado_tarea: parent.id_estado_tarea_fin}})
            }
        },
    })
})
