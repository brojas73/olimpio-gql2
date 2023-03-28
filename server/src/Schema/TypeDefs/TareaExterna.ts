import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

import { EstadoTarea } from '../../Entities/EstadoTarea'
import { Sucursal } from '../../Entities/Sucursal'
import { TareaExternaLog } from '../../Entities/TareaExternaLog'
import { TipoServicio } from '../../Entities/TipoServicio'
import { TipoTrabajo } from '../../Entities/TipoTrabajo'
import { Usuario } from '../../Entities/Usuario'

import { IEstadoTarea } from '../../Interfaces/EstadoTarea'
import { ISucursal } from '../../Interfaces/Sucursal'
import { ITareaExterna } from '../../Interfaces/TareaExterna'
import { ITareaExternaLog } from '../../Interfaces/TareaExternaLog'
import { ITipoServicio } from '../../Interfaces/TipoServicio'
import { ITipoTrabajo } from '../../Interfaces/TipoTrabajo'
import { IUsuario } from '../../Interfaces/Usuario'

import { EstadoTareaType } from './EstadoTarea'
import { SucursalType } from './Sucursal'
import { TareaExternaLogType } from './TareaExternaLog'
import { TipoServicioType } from './TipoServicio'
import { TipoTrabajoType } from './TipoTrabajo'
import { UsuarioType } from './Usuario'

export const TareaExternaType = new GraphQLObjectType({
    name: 'TareaExterna',
    fields: () => ({
        id_tarea_externa: { type:  GraphQLID },
        ticket: { type: GraphQLString }, 
        descripcion: { type: GraphQLString },
        fecha_requerida: { type:  GraphQLString },
        hora_requerida: { type:  GraphQLString },
        fecha_creacion: { type:  GraphQLDateTime },
        fecha_modificacion: { type:  GraphQLDateTime },
        estado: { type: GraphQLInt },
        sucursal_origen: {
            type: SucursalType,
            async resolve(parent: ITareaExterna, _): Promise<ISucursal | null> {
                return await Sucursal.findOne({where: {id_sucursal: parent.id_sucursal_origen}})
            }
        },
        sucursal_destino: {
            type: SucursalType,
            async resolve(parent: ITareaExterna, _): Promise<ISucursal | null> {
                return await Sucursal.findOne({where: {id_sucursal: parent.id_sucursal_destino}})
            }
        },
        tipo_trabajo: {
            type: TipoTrabajoType,
            async resolve(parent: ITareaExterna, _): Promise<ITipoTrabajo | null> {
                return await TipoTrabajo.findOne({where: {id_tipo_trabajo: parent.id_tipo_trabajo}})
            }
        },
        tipo_servicio: {
            type: TipoServicioType,
            async resolve(parent: ITareaExterna, _): Promise<ITipoServicio | null> {
                return TipoServicio.findOne({where: {id_tipo_servicio: parent.id_tipo_servicio}})
            }
        },
        estado_tarea: {
            type: EstadoTareaType,
            async resolve(parent: ITareaExterna, _): Promise<IEstadoTarea | null> {
                return await EstadoTarea.findOne({where: {id_estado_tarea: parent.id_estado_tarea}})
            }
        },
        creado_por: {
            type: UsuarioType,
            async resolve(parent: ITareaExterna, _): Promise<IUsuario | null> {
                return await Usuario.findOne({where: { id_usuario: parent.id_creado_por }})
            }
        },
        modificado_por: {
            type: UsuarioType,
            async resolve(parent: ITareaExterna, _): Promise<IUsuario | null> {
                return await Usuario.findOne({where: { id_usuario: parent.id_modificado_por }})
            }
        },

        tareas_externas_log: {
            type: new GraphQLList(TareaExternaLogType),
            resolve(parent: ITareaExterna, _: any): Promise<ITareaExternaLog[]> {
                return TareaExternaLog.find({where: { id_tarea_externa: parent.id_tarea_externa}})
            }
        },
    })
})
