module.exports[process.env.NODE_ENV] = {
  client: 'postgresql',
  connection: {
    database: 'todolist_on_herbs_db',
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './src/infra/data/database/migrations',
    tableName: 'knex_migrations'
  }
}