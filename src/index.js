import mongoose from 'mongoose'
import app from './app.js'
import logger from './config/logger.js'
const { DB_URL } = process.env
// exit on mongodb error
mongoose.connection.on('error', (err) => {
  logger.error(`Mongo conntection error: ${err}`)
  process.exit(1)
})
// mongodb debug
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
}

// Connection
mongoose.connect(DB_URL).then(() => {
  logger.info('Connected to database')
})

const PORT = process.env.PORT || 5000

let server = app.listen(PORT, () => {
  logger.info('App running in port: ' + PORT)
})

const exitHandler = () => {
  if (server) {
    logger.info('Server closed')
    process.exit(1)
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  logger.error(error)
  exitHandler()
}
process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

// SIGTERM
process.on('SIGTERM', () => {
  if (server) {
    logger.info('Server closed')
    process.exit(1)
  }
})
