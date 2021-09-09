const { Err } = require('@herbsjs/herbs')
const { logger } = require('../../libs')

const defaultMsg = (objName) => `${objName} is not authenticated`

function UnauthenticatedError(objName, message, stackTrace) {
  const error = {
    code: `${objName}_UNAUTHENTICATED_ERROR`.toUpperCase(),
    message: message || defaultMsg(objName),
    stackTrace
  }
  logger.error(`ERROR ${error.code}: ${error.message} \n ${error.stackTrace}`)
  return Err(error)
}

module.exports = UnauthenticatedError
