/* eslint-disable no-undef, no-console */
const server = require('./infra/api/server')
const config = require('./config')
const { logger } = require('./libs')

server.start(config).catch((err) => {
  console.error('----- Fatal error -----')
  console.error(err)
  logger.error(err)
  process.exit(1)
})
