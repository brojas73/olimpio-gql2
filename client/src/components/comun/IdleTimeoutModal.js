import { Modal, Button } from 'react-bootstrap'
import { TAMANO_CONTROLES } from './utils'

const IdleTimeoutModal = ({showModal, handleContinue, handleLogout}) => {
    return (
        <Modal show={showModal} onHide={handleContinue} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Tu Sesión Expiró</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Quieres continuar con la sesión?</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleLogout} size={TAMANO_CONTROLES}>Salir</Button>
                <Button variant='primary' onClick={handleContinue} size={TAMANO_CONTROLES}>Continuar Sesión</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default IdleTimeoutModal
