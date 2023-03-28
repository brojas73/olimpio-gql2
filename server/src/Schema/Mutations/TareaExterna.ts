import { GraphQLString, GraphQLInt, GraphQLID, GraphQLNonNull } from "graphql"
import { TareaExternaType } from "../TypeDefs/TareaExterna"
import { TareaExterna } from "../../Entities/TareaExterna"
import { MessageType } from "../TypeDefs/MessageType"
import { ITareaExterna } from "../../Interfaces/TareaExterna"

export const CREATE_TAREA_EXTERNA = {
    type: TareaExternaType,
    args: {
        id_sucursal_origen: { type: new GraphQLNonNull(GraphQLID) },
        ticket: { type: new GraphQLNonNull(GraphQLString) },
        descripcion: { type: new GraphQLNonNull(GraphQLString) },
        id_tipo_trabajo: { type:  new GraphQLNonNull(GraphQLID) },
        id_sucursal_destino: { type:  new GraphQLNonNull(GraphQLID) },
        fecha_requerida: { type:  new GraphQLNonNull(GraphQLString) },
        hora_requerida: { type:  new GraphQLNonNull(GraphQLString) },
        id_tipo_servicio: { type:  new GraphQLNonNull(GraphQLID) },
        id_estado_tarea: { type:  new GraphQLNonNull(GraphQLID) },
        id_usuario: { type: new GraphQLNonNull(GraphQLID)} 
    },
    async resolve(_: any, args: ITareaExterna) {
        const tareaExterna = new TareaExterna()
        tareaExterna.id_sucursal_origen = args.id_sucursal_origen
        tareaExterna.ticket = args.ticket
        tareaExterna.descripcion = args.descripcion
        tareaExterna.id_tipo_trabajo = args.id_tipo_trabajo
        tareaExterna.id_sucursal_destino = args.id_sucursal_destino
        tareaExterna.fecha_requerida = args.fecha_requerida
        tareaExterna.hora_requerida = args.hora_requerida
        tareaExterna.id_tipo_servicio = args.id_tipo_servicio
        tareaExterna.id_estado_tarea = args.id_estado_tarea
        tareaExterna.id_creado_por = args.id_usuario || 0
        tareaExterna.id_modificado_por = args.id_usuario || 0
        tareaExterna.estado = 1
        await tareaExterna.save()
        return args
    }
}

export const BORRA_TAREA_EXTERNA = {
    type: MessageType,
    args: {
        id_tarea_externa: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
        const tareaExterna = await TareaExterna.findOne({ where: { id_tarea_externa: args.id_tarea_externa }})

        if (!tareaExterna) throw new Error('La tarea no existe')

        await TareaExterna.delete({id_tarea_externa: args.id_tarea_externa})
        return tareaExterna
    }
}

export const ACTUALIZA_TAREA_EXTERNA_ESTADO = {
    type: TareaExternaType,
    args: { 
        id_tarea_externa: { type: new GraphQLNonNull(GraphQLID) },
        id_estado_tarea: { type:  new GraphQLNonNull(GraphQLID) },
        id_modificado_por: { type:  new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args: ITareaExterna): Promise<ITareaExterna> {
        const tareaExterna = await TareaExterna.findOne({ where: { id_tarea_externa: args.id_tarea_externa }})

        if (!tareaExterna) throw new Error('La tarea no existe')

        await TareaExterna.update({id_tarea_externa: args.id_tarea_externa}, {id_estado_tarea: args.id_estado_tarea, id_modificado_por: args.id_modificado_por})
        return {...tareaExterna, id_estado_tarea: args.id_estado_tarea }
    }
}


