import express from 'express'
import tareaExternaController from '../../controllers/tareasExternasController.js'


const router = express.Router()

router.get('/', tareaExternaController.tareasExternasActivas)
router.get('/:idTareaExterna', tareaExternaController.tareaExterna)
router.get('/por-atenderse-hoy/:idSucursal', tareaExternaController.porAtenderseHoy)
router.post('/', tareaExternaController.creaTareaExterna)
router.patch('/:idTareaExterna', tareaExternaController.actualizaEstadoTareaExterna)
router.delete('/:idTareaExterna', tareaExternaController.borraTareaExterna)

export default router 

