import express from 'express'
import servicioDomicilioController from '../../controllers/serviciosDomicilioController.js'
import isConnected from '../../middleware.js'


const router = express.Router()

router.get('/', isConnected(), servicioDomicilioController.serviciosDomicilioActivos)
router.get('/:idServicioDomicilio', isConnected(), servicioDomicilioController.servicioDomicilio)
router.post('/', isConnected(), servicioDomicilioController.creaServicioDomicilio)
router.patch('/:idServicioDomicilio', isConnected(), servicioDomicilioController.actualizaServicioDomicilio)
router.delete('/:idServicioDomicilio', isConnected(), servicioDomicilioController.borraServicioDomicilio)

export default router 

