import Filtros from "./Filtros"
import TituloServicioDomicilio from "./TituloServicioDomicilio"

const ServiciosDomicilioHeader = ({titulo, renglones, onRefresh}) => {
  function handleRefresh() {
    onRefresh()
  }

  return (
    <>
      <Filtros />
      <TituloServicioDomicilio titulo={titulo} renglones={renglones} onRefresh={handleRefresh}/>
    </>
  )
}

export default ServiciosDomicilioHeader
