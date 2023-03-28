import { GraphQLList } from 'graphql'
import { TipoAccionType } from '../TypeDefs/TipoAccion'
import { TipoAccion } from '../../Entities/TipoAccion'
import { ITipoAccion } from '../../Interfaces/TipoAccion'

export const GET_ALL_TIPOS_ACCION = {
    type: new GraphQLList(TipoAccionType),
    async resolve(): Promise<ITipoAccion[]> {
        return await TipoAccion.find()
    }
}

