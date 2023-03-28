import { Button, Modal } from 'react-bootstrap'

const Confirmacion = ({mostrar, titulo, mensaje, onConfirmar}) => {
  return (
    <Modal show={mostrar} onHide={() => onConfirmar(false)}>
        <Modal.Header>
            <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mensaje}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => onConfirmar(false)}>Cancelar</Button>
            <Button variant="primary" onClick={() => onConfirmar(true)}>Confirmar</Button>
        </Modal.Footer>
    </Modal> 
  )
}

export default Confirmacion
