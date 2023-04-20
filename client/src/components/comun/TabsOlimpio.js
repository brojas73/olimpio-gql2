import { useNavigate } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'

// Hooks
import { useAuth } from '../../hooks/useAuth'
import { useTareasExternas } from '../../context/TareasExternasContext'

// Utils
import { FONT_SIZE_TABS } from './utils'

// Mutations
import { useMutation } from 'react-query'
import { logout } from '../../mutations/Usuario'

// Components
import IdleTimeoutHandler from './IdleTimeoutHandler'
import GlobalNavbar from './GlobalNavbar'

const TabsOlimpio = () => {
    const navigate = useNavigate()
    const { conectado, setConectado } = useTareasExternas()
    const { setCredenciales } = useAuth()

    const { mutate: doLogout } = useMutation({
        mutationFn: logout, 
        onSuccess: () => {
          setCredenciales(null)
          setConectado(false)
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
        
    return (
        <>
            {
                conectado && (
                    <IdleTimeoutHandler onLogout={() => handleLogout()} />
                )
            }
            <GlobalNavbar onLogout={() => handleLogout()}/>

            {
                conectado && (
                    <Tabs
                        defaultAactiveKey='tareas-externas'
                        id='olimpio-tab'
                        className='mb-3'
                        onSelect={key => handleSelect(key)}
                        style={{fontSize: `${FONT_SIZE_TABS}`}}
                        fill
                    >
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
