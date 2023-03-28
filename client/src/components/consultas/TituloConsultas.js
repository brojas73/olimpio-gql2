import { Navbar, Container, Button, Badge } from 'react-bootstrap'

const TituloConsultas = ({titulo, renglones}) => {
    return (
        <Navbar>
            <Container className="justify-content-start">
                <Button variant="dark" size="md">
                    {titulo} { " "}
                    <Badge bg="primary">{renglones}</Badge>
                </Button>
            </Container>
        </Navbar>
    )
}

export default TituloConsultas
