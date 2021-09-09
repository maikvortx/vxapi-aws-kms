const { Err } = require('@herbsjs/herbs')
const { logger } = require('../../libs')

const defaultMsg = (entityName) => `${entityName} is not found`

function NotFoundError(entityName, message, stackTrace) {
  const error = {
    code: `${entityName}_NOT_FOUND`.toUpperCase(),
    message: message || defaultMsg(entityName),
    stackTrace
  }
  logger.error(`ERROR ${error.code}: ${error.message} \n ${error.stackTrace}`)
  return Err(error)
}

module.exports = NotFoundError
