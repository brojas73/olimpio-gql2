import { GraphQLID, GraphQLList } from 'graphql'
import { RolType } from '../TypeDefs/Rol'
import { Rol } from '../../Entities/Rol'
import { IRol } from '../../Interfaces/Rol'

export const GET_ALL_ROLES = {
    type: new GraphQLList(RolType),
    async resolve(): Promise<IRol[]> {
        return await Rol.find()
    }
}

export const GET_ROL_BY_ID = {
    type: RolType,
    args: {
        id_rol: { type: GraphQLID },
    },
    async resolve(_: any, args: IRol): Promise<IRol | null> {
        return await Rol.findOne({ where: { id_rol: args.id_rol }})    
    }
}
