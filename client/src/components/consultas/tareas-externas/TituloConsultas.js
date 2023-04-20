import { Navbar, Button, Badge } from 'react-bootstrap'

const TituloConsultas = ({titulo, renglones}) => {
    return (
        <Navbar>
            {
                titulo && (
                    <Button variant="dark" size="sm">
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
