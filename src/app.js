import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import fileUpload from 'express-fileupload'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import createHttpError from 'http-errors'
import dotenv from 'dotenv'
import routes from './routes/index.js'
dotenv.config()
const app = express()

// Middleware Connections
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//santize data
app.use(ExpressMongoSanitize())

app.use(cookieParser())

// compress response body for all requirest
app.use(compression())

app.use(fileUpload({ useTempFiles: true }))
app.use(cors())

// Routes
app.use('/api', routes)

app.use(async (req, res, next) => {
  next(createHttpError.NotFound('This route does not exist'))
})

// error handler
app.use(async (err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

export default app
