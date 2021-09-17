const secretsManager = require('./secrets').SecretsManager

module.exports = async () => {
  const dbSecrets = await secretsManager.getDBSecrets()

  return {
    client: dbSecrets.DB_CLIENT || 'pg',
    connection: {
      host: dbSecrets.DB_HOST || '127.0.0.1',
      user: dbSecrets.DB_USER || 'postgres',
      password: dbSecrets.DB_PASSWORD || 'postgres',
      database: dbSecrets.DB_DATABASE || 'todolist_on_herbs_db'
    }
  }
}
