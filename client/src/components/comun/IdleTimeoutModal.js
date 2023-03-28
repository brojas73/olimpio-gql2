import { Modal, Button } from 'react-bootstrap'

const IdleTimeoutModal = ({showModal, handleContinue, handleLogout}) => {
    return (
        <Modal show={showModal} onHide={handleContinue} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Tu Sesión Expiró</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Quieres continuar con la sesión?</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleLogout}>Salir</Button>
                <Button variant='primary' onClick={handleContinue}>Continuar Sesión</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default IdleTimeoutModal
