import { Button, Modal } from 'react-bootstrap'

import { TAMANO_CONTROLES } from './utils'

const ConfirmacionModal = ({mostrar, titulo, mensaje, onConfirmar}) => {
  return (
    <Modal show={mostrar} onHide={() => onConfirmar(false)} backdrop="static">
        <Modal.Header>
            <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mensaje}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => onConfirmar(false)} size={TAMANO_CONTROLES}>Cancelar</Button>
            <Button variant="primary" onClick={() => onConfirmar(true)} size={TAMANO_CONTROLES}>Confirmar</Button>
        </Modal.Footer>
    </Modal> 
  )
}

export default ConfirmacionModal
