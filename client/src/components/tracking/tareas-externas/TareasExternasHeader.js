import Filtros from "./Filtros"
import TituloTareas from "./TituloTareas"

const TareasExternasHeader = ({titulo, renglones}) => {

  return (
    <>
      <Filtros />
      <TituloTareas titulo={titulo} renglones={renglones}/>
    </>
  )
}

export default TareasExternasHeader
