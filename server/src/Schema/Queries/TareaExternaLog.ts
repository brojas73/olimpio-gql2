import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql'
import { TareaExternaLogType } from '../TypeDefs/TareaExternaLog'
import { TareaExternaLog } from '../../Entities/TareaExternaLog'
import { ITareaExternaLog } from '../../Interfaces/TareaExternaLog'
import { ITareaExterna } from '../../Interfaces/TareaExterna'

export const GET_ALL_TAREAS_EXTERNAS_LOG = {
    type: new GraphQLList(TareaExternaLogType),
    async resolve(): Promise<ITareaExternaLog[]> {
        return await TareaExternaLog.find()
    }
}

export const GET_TAREA_EXTERNA_LOG_BY_ID = {
    type: TareaExternaLogType,
    args: {
        id_tarea_externa_log: { type: GraphQLInt }
    },
    async resolve(_: any, args: ITareaExternaLog): Promise<ITareaExternaLog | null> {
        return await TareaExternaLog.findOne({where: {id_tarea_externa_log: args.id_tarea_externa_log}})
    }
}

export const GET_TAREAS_EXTERNAS_LOG_BY_ID_TAREA_EXTERNA = {
    type: new GraphQLList(TareaExternaLogType),
    args: {
        id_tarea_externa: { type: GraphQLInt }
    },
    async resolve(_: any, args: ITareaExterna): Promise<ITareaExternaLog[]> {
        return await TareaExternaLog.find({where: {id_tarea_externa: args.id_tarea_externa}})
    }
}

