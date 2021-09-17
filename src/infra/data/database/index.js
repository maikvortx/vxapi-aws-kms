const knex = require('knex')

module.exports = {
    factory: async (config) => knex(await config.database())
}