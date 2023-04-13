import express from 'express'
import serviciosDomicilioLogController from '../../controllers/serviciosDomicilioLogController.js'
import isConnected from '../../middleware.js'


const router = express.Router()

router.get('/:idServicioDomicilio', isConnected(), serviciosDomicilioLogController.serviciosDomicilioLogByServicioDomicilio)

export default router 

 