import express from 'express'
import usuariosController from '../../controllers/usuariosController.js'
import isConnected from '../../middleware.js'

const router = express.Router()

router.post('/login', usuariosController.login)
router.post('/logout', isConnected(), usuariosController.logout)
router.post('/me', usuariosController.me)

export default router 

 