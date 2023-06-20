import { useNavigate } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'

// Hooks
import { useAuth } from '../../hooks/useAuth'
import { useOlimpio } from '../../context/OlimpioContext'

// Mutations
import { useMutation } from 'react-query'
import { logout } from '../../mutations/Usuario'

// Components
import IdleTimeoutHandler from './IdleTimeoutHandler'
import GlobalNavbar from './GlobalNavbar'
import { useTareasExternas } from '../../context/TareasExternasContext'
import { useServiciosDomicilio } from '../../context/ServiciosDomicilioContext'
import { useConsultas } from '../../context/ConsultasContext'

const TabsOlimpio = () => {
    const navigate = useNavigate()
    const { conectado, setConectado } = useOlimpio()
    const { logout: _logout } = useAuth()
    const { initFiltros: initFiltrosTareasExternas } = useTareasExternas()
    const { initFiltros: initFiltrosServiciosDomicilio } = useServiciosDomicilio()
    const { initFiltros: initFiltrosConsultas } = useConsultas()

    const { mutate: doLogout } = useMutation({
        mutationFn: logout, 
        onSuccess: () => {
          _logout()
          setConectado(false)
          initFiltros()
          navigate('/login')
        }
      })

    function handleSelect(key) {
        const url = key.includes('consultas') ? `/consultas/tareas-externas` : `/tracking/${key}`
        navigate(url)
    }
    
    function handleLogout() {
        doLogout()
    }  

    function initFiltros() {
        initFiltrosTareasExternas()
        initFiltrosServiciosDomicilio()
        initFiltrosConsultas()
    }
        
    return (
        <>
            {
                conectado && (
                    <IdleTimeoutHandler onLogout={handleLogout} />
                )
            }
            <GlobalNavbar onLogout={handleLogout}/>

            {
                conectado && (
                    <Tabs
                        defaultActiveKey='tareas-externas'
                        id='olimpio-tab'
                        className='mb-3 olimpio-tab-size'
                        onSelect={key => handleSelect(key)}
                        fill
                    >
                        <Tab title='Tareas Locales' eventKey='tareas-locales' ></Tab>
                        <Tab title='Tareas Externas' eventKey='tareas-externas' ></Tab>
                        <Tab title='Servicios a Domicilio' eventKey='servicios-domicilio' ></Tab>
                        <Tab title='Consultas' eventKey='consultas'></Tab>
                    </Tabs>
                )   
            }
        </>
    )
}

export default TabsOlimpio
