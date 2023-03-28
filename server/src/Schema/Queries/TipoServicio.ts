import { GraphQLList } from 'graphql'
import { TipoServicioType } from '../TypeDefs/TipoServicio'
import { TipoServicio } from '../../Entities/TipoServicio'
import { ITipoServicio } from '../../Interfaces/TipoServicio'

export const GET_ALL_TIPOS_SERVICIO = {
    type: new GraphQLList(TipoServicioType),
    async resolve(): Promise<ITipoServicio[]> {
        return await TipoServicio.find()
    }
}

