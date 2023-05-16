import express from 'express'
import tareaLocalesController from '../../controllers/tareasLocalesController.js'
import isConnected from '../../middleware.js'


const router = express.Router()

router.get('/', isConnected(), tareaLocalesController.tareasLocalesActivas)
router.get('/:idTareaLocal', isConnected(), tareaLocalesController.tareaLocal)
router.get('/por-atenderse-hoy/:idSucursal', isConnected(), tareaLocalesController.porAtenderseHoy)
router.post('/', isConnected(), tareaLocalesController.creaTareaLocal)
router.patch('/:idTareaLocal', isConnected(), tareaLocalesController.actualizaEstadoTareaLocal)
router.delete('/:idTareaLocal', isConnected(), tareaLocalesController.borraTareaLocal)

export default router 

