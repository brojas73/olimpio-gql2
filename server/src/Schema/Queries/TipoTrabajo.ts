import { GraphQLList } from 'graphql'
import { TipoTrabajoType } from '../TypeDefs/TipoTrabajo'
import { TipoTrabajo } from '../../Entities/TipoTrabajo'
import { ITipoTrabajo } from '../../Interfaces/TipoTrabajo'

export const GET_ALL_TIPOS_TRABAJO = {
    type: new GraphQLList(TipoTrabajoType),
    async resolve(): Promise<ITipoTrabajo[]> {
        return await TipoTrabajo.find()
    }
}

