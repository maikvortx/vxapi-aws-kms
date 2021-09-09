const { Err } = require('@herbsjs/herbs')
const { logger } = require('../../libs')

const defaultMsg = (objName) => `${objName} is not unauthorized`

function UnauthorizedError(objName, message, stackTrace) {
  const error = {
    code: `${objName}_UNAUTHORIZED_ERROR`.toUpperCase(),
    message: message || defaultMsg(objName),
    stackTrace
  }
  logger.error(`ERROR ${error.code}: ${error.message} \n ${error.stackTrace}`)
  return Err(error)
}

module.exports = UnauthorizedError
