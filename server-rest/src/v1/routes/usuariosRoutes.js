import express from 'express'
import usuariosController from '../../controllers/usuariosController.js'


const router = express.Router()

router.post('/login', usuariosController.login)

export default router 

