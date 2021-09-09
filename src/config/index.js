require('dotenv').config()

module.exports = {
    isProd: process.env.NODE_ENV === 'production',
    env: process.env.NODE_ENV,
    api: require('./api'),
    database: require('./postgres'),
    logger: require('./logger'),
    clients: require('./clients')
}
