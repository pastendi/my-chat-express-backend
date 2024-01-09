import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'This email address already exist'],
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    picture: {
      type: String,
      default:
        'https://res.cloudinary.com/duyg4immh/image/upload/v1703989529/R_eayrdf.png',
    },
    status: {
      type: String,
      default: 'Hey there ! I am using whatsapp',
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      minLength: [
        6,
        'Please make sure your password is atleast 6 characters long',
      ],
      maxLength: [
        32,
        'Please make sure your password is less than 32 characters long',
      ],
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
)

const UserModel =
  mongoose.models.UserModel || mongoose.model('UserModel', userSchema)
export default UserModel
