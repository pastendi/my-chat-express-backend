import { createUser } from '../services/authService.js'

export const register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body
    const newUser = await createUser({ name, email, picture, status, password })
    res.json(newUser)
  } catch (error) {
    next(error)
  }
}
export const login = async (req, res, next) => {
  try {
    res.send('welcome back')
  } catch (error) {
    next(error)
  }
}
