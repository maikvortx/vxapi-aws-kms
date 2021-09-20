const secretsManager = require('./secrets').SecretsManager

module.exports = async () => {
  const dbSecrets = await secretsManager.getDBSecrets()

  return {
    client: dbSecrets.client || 'pg',
    connection: {
      host: dbSecrets.host || '127.0.0.1',
      user: dbSecrets.user || 'postgres',
      password: dbSecrets.password || 'postgres',
      database: dbSecrets.database || 'todolist_on_herbs_db'
    }
  }
}
