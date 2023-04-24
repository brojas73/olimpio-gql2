import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar, Button, Badge } from 'react-bootstrap'
import { TAMANO_CONTROLES } from '../../comun/utils'

const TituloConsultas = ({titulo, renglones, onRefresh}) => {

    function handleRefresh() {
        onRefresh()
    }

    return (
        <Navbar>
            {
                titulo && (
                    <Button variant="dark" size={TAMANO_CONTROLES} onClick={handleRefresh}>
                        <FontAwesomeIcon icon={faRefresh} />
                        &nbsp;
                        {titulo}
                        &nbsp;
                        <Badge bg="primary" pill>{renglones}</Badge>
                    </Button>
                )
            }
        </Navbar>
    )
}

export default TituloConsultas
