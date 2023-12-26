import express from 'express'
import { login, register } from '../controllers/auth_controller.js'
import trimRequest from 'trim-request'
const router = express.Router()

router.route('/register').post(trimRequest.all, register)
router.route('/login').post(trimRequest.all, login)

export default router
