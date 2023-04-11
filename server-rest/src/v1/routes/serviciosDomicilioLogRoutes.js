import express from 'express'
import serviciosDomicilioLogController from '../../controllers/serviciosDomicilioLogController.js'


const router = express.Router()

router.get('/:idServicioDomicilio', serviciosDomicilioLogController.serviciosDomicilioLogByServicioDomicilio)

export default router 

 