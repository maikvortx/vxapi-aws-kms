const { createLogger, format } = require('winston')
const WFirehose = require('winston-firehose')
const config = require('../config')

class Logger {
  constructor (transport) {
    Object.assign(this, {
      error: this.callLogger.bind(this, 'error'),
      warn: this.callLogger.bind(this, 'warn'),
      info: this.callLogger.bind(this, 'info'),
      verbose: this.callLogger.bind(this, 'verbose'),
      debug: this.callLogger.bind(this, 'debug'),
      silly: this.callLogger.bind(this, 'silly')
    })

    this.transport = transport
    this.loggerInstance = createLogger({

      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [this.transport]
    })
  }

  getExecution (deep) {
    const stack = new Error().stack
    return stack.split('\n')[deep]
  }

  callLogger (level, message, contents) {
    const execution = this.getExecution(3)
    const logObject = { execution, message, contents }

    if (!config.isProd) {
      // eslint-disable-next-line no-console
      console.log(message, contents)
      return
    }

    this.loggerInstance.log(level, logObject)
  }
}

module.exports = new Logger(new WFirehose(config.logger.kinesisFirehose))
