import Filtros from "./Filtros"
import TituloConsultas from "./TituloConsultas"

const TareasExternasHeader = ({titulo, renglones, onRefresh}) => {
  function handleRefresh() {
    onRefresh()
  }

  return (
    <>
      <Filtros />
      <TituloConsultas titulo={titulo} renglones={renglones} onRefresh={handleRefresh} />
    </>
  )
}

export default TareasExternasHeader
