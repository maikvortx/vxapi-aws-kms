const os = require("os")

function defaultFormatter(message) {
  message = JSON.stringify(message, (key, value) =>  typeof value === "bigint" ? value.toString() : value )
  return `${message}${os.EOL}`
}

module.exports = {
  console: {
    json: true,
    stringify: true,
    level: process.env.LOGGER_LEVEL || 'debug'
  },
  kinesisFirehose: {
    streamName: process.env.KINESIS_FIREHOSE_LOGGER_NAME,
    firehoseOptions: {
      region: process.env.KINESIS_LOGGER_REGION,
      accessKeyId: process.env.S3_LOGGER_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_LOGGER_SECRET_ACCESS_KEY
    },
    formatter: defaultFormatter
  },
  filename: '../logs/logs.log'
}
