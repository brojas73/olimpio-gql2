import Filtros from "./Filtros"
import TituloTareas from "./TituloTareas"

const TareasExternasHeader = ({titulo, renglones, onRefresh}) => {
  function handleRefresh() {
    onRefresh()
  }

  return (
    <>
      <Filtros />
      <TituloTareas titulo={titulo} renglones={renglones} onRefresh={handleRefresh}/>
    </>
  )
}

export default TareasExternasHeader
