const { Err } = require('@herbsjs/herbs')
const { logger } = require('../../libs')

const defaultMsg = (entityName) => `${entityName} is not valid`

function NotValidError(entityName, message, stackTrace) {
  const error = {
    code: `${entityName}_NOT_VALID`.toUpperCase(),
    message: message || defaultMsg(entityName),
    stackTrace
  }
  logger.error(`ERROR ${error.code}: ${error.message} \n ${error.stackTrace}`)
  return Err(error)
}

module.exports = NotValidError
