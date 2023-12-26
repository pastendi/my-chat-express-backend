export const register = async (req, res, next) => {
  try {
    res.send('hello new user')
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
