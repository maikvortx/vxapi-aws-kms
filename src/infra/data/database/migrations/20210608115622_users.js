
exports.up = async function (knex) {
    return knex.schema
    .createTableIfNotExists('users', function (table) {
        table.increments('id').primary()
        table.string('cpf')
        table.string('name')
        table.string('cnpj')
        table.string('email')
    })
}

exports.down = function (knex) {
    return knex.schema 
    .dropTableIfExists('users')
}