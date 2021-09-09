require('dotenv').config()

module.exports = {
  port: process.env.API_PORT || 3000,
  host: process.env.API_HOST ||  '0.0.0.0',
  graphql: {
    rootPath: process.env.ROOT_PATH || '/graphql'
  }
}
