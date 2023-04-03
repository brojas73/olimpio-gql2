import Filtros from "./Filtros"
import TituloServicioDomicilio from "./TituloServicioDomicilio"

const ServiciosDomicilioHeader = ({titulo, renglones}) => {

  return (
    <>
      <Filtros />
      <TituloServicioDomicilio titulo={titulo} renglones={renglones}/>
    </>
  )
}

export default ServiciosDomicilioHeader
