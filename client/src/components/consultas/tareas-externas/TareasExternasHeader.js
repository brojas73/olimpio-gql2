import Filtros from "./Filtros"
import TituloConsultas from "./TituloConsultas"

const TareasExternasHeader = ({titulo, renglones, onChange}) => {
  function handleOnChange(values) {
    if (onChange)
      onChange(values)
  }

  return (
    <>
      <Filtros onChange={handleOnChange}/>
      <TituloConsultas titulo={titulo} renglones={renglones}/>
    </>
  )
}

export default TareasExternasHeader
