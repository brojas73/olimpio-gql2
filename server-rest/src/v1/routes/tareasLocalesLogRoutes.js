import express from 'express'
import tareasLocalesLogController from '../../controllers/tareasLocalesLogController.js'
import isConnected from '../../middleware.js'


const router = express.Router()

router.get('/', isConnected(), tareasLocalesLogController.tareasLocalesLog)
router.get('/:idTareaLocal', isConnected(), tareasLocalesLogController.tareasLocalesLogByTareaLocal)

export default router 

