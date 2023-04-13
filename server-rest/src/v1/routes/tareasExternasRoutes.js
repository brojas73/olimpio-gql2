import express from 'express'
import tareaExternaController from '../../controllers/tareasExternasController.js'
import isConnected from '../../middleware.js'


const router = express.Router()

router.get('/', isConnected(), tareaExternaController.tareasExternasActivas)
router.get('/:idTareaExterna', isConnected(), tareaExternaController.tareaExterna)
router.get('/por-atenderse-hoy/:idSucursal', isConnected(), tareaExternaController.porAtenderseHoy)
router.post('/', isConnected(), tareaExternaController.creaTareaExterna)
router.patch('/:idTareaExterna', isConnected(), tareaExternaController.actualizaEstadoTareaExterna)
router.delete('/:idTareaExterna', isConnected(), tareaExternaController.borraTareaExterna)

export default router 

