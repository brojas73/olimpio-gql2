import express from 'express'
import servicioDomicilioController from '../../controllers/serviciosDomicilioController.js'


const router = express.Router()

router.get('/', servicioDomicilioController.serviciosDomicilio)
router.get('/:idServicioDomicilio', servicioDomicilioController.servicioDomicilio)
router.post('/', servicioDomicilioController.creaServicioDomicilio)
router.patch('/:idServicioDomicilio', servicioDomicilioController.actualizaEstadoServicioDomicilio)
router.delete('/:idServicioDomicilio', servicioDomicilioController.borraServicioDomicilio)

export default router 

