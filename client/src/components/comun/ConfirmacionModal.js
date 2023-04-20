import { Button, Modal } from 'react-bootstrap'

const ConfirmacionModal = ({mostrar, titulo, mensaje, onConfirmar}) => {
  return (
    <Modal show={mostrar} onHide={() => onConfirmar(false)}>
        <Modal.Header>
            <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mensaje}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => onConfirmar(false)} size="sm">Cancelar</Button>
            <Button variant="primary" onClick={() => onConfirmar(true)} size="sm">Confirmar</Button>
        </Modal.Footer>
    </Modal> 
  )
}

export default ConfirmacionModal
