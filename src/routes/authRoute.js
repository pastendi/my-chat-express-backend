import express from 'express'
import { login, register } from '../controllers/authController.js'
import trimRequest from 'trim-request'
const router = express.Router()

router.route('/register').post(trimRequest.all, register)
router.route('/login').post(trimRequest.all, login)

export default router
