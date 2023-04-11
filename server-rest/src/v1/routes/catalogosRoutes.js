import express from 'express'
import catalogosController from '../../controllers/catalogosController.js'

const router = express.Router()

router.get('/estados-servicio-domicilio', catalogosController.estadosServicioDomicilio)
router.get('/estados-tarea-externa', catalogosController.estadosTareaExterna)
router.get('/formas-pago', catalogosController.formasPago)
router.get('/roles', catalogosController.roles)
router.get('/sucursales', catalogosController.sucursales)
router.get('/tipos-servicio', catalogosController.tiposServicio)
router.get('/tipos-trabajo', catalogosController.tiposTrabajo)

export default router 

