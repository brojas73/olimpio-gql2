import { GraphQLID, GraphQLList, GraphQLString } from 'graphql'
import { TareaExternaType} from '../TypeDefs/TareaExterna'
import { TareaExterna } from '../../Entities/TareaExterna'
import { ITareaExterna } from '../../Interfaces/TareaExterna'
import { LessThan, Like } from 'typeorm'
import { ISucursal } from '../../Interfaces/Sucursal'

const TIPO_SUCURSAL = {
    ORIGEN: 'ORIGEN',
    DESTINO: 'DESTINO'
}

export const GET_ALL_TAREAS_EXTERNAS = {
    type: new GraphQLList(TareaExternaType),
    async resolve(): Promise<ITareaExterna[]> {
        return await TareaExterna.find({where: { estado: 1}})
    }
}

export const GET_ALL_TAREAS_EXTERNAS_ACTIVAS = {
    type: new GraphQLList(TareaExternaType),
    async resolve(): Promise<ITareaExterna[]> {
        return await TareaExterna.find({where: { estado: 1, id_estado_tarea: LessThan(7)}})
    }
}

export const GET_TAREAS_EXTERNAS_ACTIVAS_BY_ORIGEN = {
    type: new GraphQLList(TareaExternaType),
    args: {
        id_sucursal: { type: GraphQLID },
    },
    async resolve(_, args: ISucursal): Promise<ITareaExterna[]> {
        return await TareaExterna.find({
            where: { 
                estado: 1, 
                id_estado_tarea: LessThan(7), 
                id_sucursal_origen: args.id_sucursal
            }
        })
    }
}

export const GET_TAREAS_EXTERNAS_ACTIVAS_BY_DESTINO = {
    type: new GraphQLList(TareaExternaType),
    args: {
        id_sucursal: { type: GraphQLID },
    },
    async resolve(_, args: ISucursal): Promise<ITareaExterna[]> {
        return await TareaExterna.find({
            where: { 
                estado: 1, 
                id_estado_tarea: LessThan(7), 
                id_sucursal_destino: args.id_sucursal
            }
        })
    }
}

export const GET_TAREAS_EXTERNAS_ACTIVAS_BY_SUCURSAL = {
    type: new GraphQLList(TareaExternaType),
    args: {
        id_sucursal: { type: GraphQLID },
        tipo_sucursal: { type: GraphQLString, defaultValue: TIPO_SUCURSAL.ORIGEN}
    },
    async resolve(_, args): Promise<ITareaExterna[]> {
        if (args.tipo_sucursal === TIPO_SUCURSAL.ORIGEN) {
            return await TareaExterna.find({
                where: { 
                    estado: 1, 
                    id_estado_tarea: LessThan(7), 
                    id_sucursal_origen: args.id_sucursal
                }
            })
        }
        
        return await TareaExterna.find({
            where: { 
                estado: 1, 
                id_estado_tarea: LessThan(7), 
                id_sucursal_destino: args.id_sucursal
            }
        })
    }
}

export const GET_TAREA_EXTERNA_BY_ID = {
    type: TareaExternaType,
    args: {
        id_tarea_externa: { type: GraphQLID },
    },
    async resolve(_: any, args: ITareaExterna): Promise<TareaExterna | null> {
        return await TareaExterna.findOne({ where: { id_tarea_externa: args.id_tarea_externa }})    
    }
}

export const GET_TAREAS_EXTERNAS_BY_TICKET = {
    type: new GraphQLList(TareaExternaType),
    args: {
        ticket: { type: GraphQLString },
    },
    async resolve(_: any, args: ITareaExterna): Promise<ITareaExterna[]> {
        return await TareaExterna.find({ where: { ticket: Like(`${args.ticket}`) }})    
    }
}

export const GET_TAREAS_EXTERNAS_BY_DESCRIPCION = {
    type: new GraphQLList(TareaExternaType),
    args: {
        descripcion: { type: GraphQLString },
    },
    async resolve(_: any, args: ITareaExterna): Promise<ITareaExterna[]> {
        return await TareaExterna.find({ where: { descripcion: Like(`${args.descripcion}`)}})    
    }
}

export const GET_TAREAS_EXTERNAS_BY_TICKET_AND_DESCRIPCION = {
    type: new GraphQLList(TareaExternaType),
    args: {
        ticket: { type: GraphQLString },
        descripcion: { type: GraphQLString },
    },
    async resolve(_: any, args: ITareaExterna): Promise<ITareaExterna[]> {
        return await TareaExterna.find({ where: { 
            ticket: Like(`${args.ticket}`),
            descripcion: Like(`${args.descripcion}`)
        }})    
    }
}
