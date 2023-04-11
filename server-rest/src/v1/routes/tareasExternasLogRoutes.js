import express from 'express'
import tareasExternaLogController from '../../controllers/tareasExternasLogController.js'


const router = express.Router()

router.get('/', tareasExternaLogController.tareasExternasLog)
router.get('/:idTareaExterna', tareasExternaLogController.tareasExternasLogByTareaExterna)

export default router 

