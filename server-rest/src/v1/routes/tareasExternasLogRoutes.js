import express from 'express'
import tareasExternaLogController from '../../controllers/tareasExternasLogController.js'
import isConnected from '../../middleware.js'


const router = express.Router()

router.get('/', isConnected(), tareasExternaLogController.tareasExternasLog)
router.get('/:idTareaExterna', isConnected(), tareasExternaLogController.tareasExternasLogByTareaExterna)

export default router 

