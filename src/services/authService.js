import createHttpError from 'http-errors'
import validator from 'validator'
import { UserModel } from '../models/index.js'

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData
  if (!name || !email || !password) {
    throw createHttpError.BadRequest('Please fill all fields')
  }
  if (!validator.isLength(name, { min: 2, max: 16 })) {
    throw createHttpError.BadRequest(
      'Your cannot be less than 2 characters or more than 16 characters '
    )
  }
  if (status?.length > 64) {
    throw createHttpError.BadRequest(
      'Please make sure your status is less than 64 characters'
    )
  }
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest('Please enter a valid email address')
  }
  const emailExist = await UserModel.findOne({ email })
  if (emailExist) {
    throw createHttpError.BadRequest('Email already exists')
  }
  if (!validator.isLength(password, { min: 6, max: 32 })) {
    throw createHttpError.BadRequest(
      'Please make sure your password is between 6 to 32 characters'
    )
  }

  const user = await UserModel({
    name,
    email,
    picture,
    status,
    password,
  }).save()
  return user
}
