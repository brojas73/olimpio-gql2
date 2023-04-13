import express from 'express'
import catalogosController from '../../controllers/catalogosController.js'
import isConnected from '../../middleware.js'

const router = express.Router()

router.get('/estados-servicio-domicilio', isConnected(), catalogosController.estadosServicioDomicilio)
router.get('/estados-tarea-externa', isConnected(), catalogosController.estadosTareaExterna)
router.get('/formas-pago', isConnected(), catalogosController.formasPago)
router.get('/roles', isConnected(), catalogosController.roles)
router.get('/sucursales', catalogosController.sucursales)
router.get('/tipos-servicio', isConnected(), catalogosController.tiposServicio)
router.get('/tipos-trabajo', isConnected(), catalogosController.tiposTrabajo)

export default router 

