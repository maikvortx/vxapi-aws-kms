const express = require('express')
const graphql = require('./graphql')
const rest = require('./rest')
const { logger } = require('../../libs')

async function start (config) {
  const app = express()

  rest(app, config)
  graphql(app, config)

  return app.listen(
    { port: config.api.port },
    () => {
      const msg = `🚀 Server UP and 🌪️ Spinning on port ${config.api.port}`
      logger.info(msg)
      // eslint-disable-next-line no-console
      console.log(msg)
    })
}

module.exports = { start }
