const AwsSecretsManager = require('aws-sdk').SecretsManager

module.exports.SecretsManager = {
  client: new AwsSecretsManager({ region: 'sa-east-1' }),

  async getSecretValue(secretName) {
    try {
      const { SecretString, SecretBinary } = await this.client.getSecretValue({ SecretId: secretName }).promise()
      const secretString = SecretString ? SecretString : Buffer(SecretBinary, 'base64').toString('ascii')
      return JSON.parse(secretString)
    } catch (error) {
      console.log(error)
    }
  },

  async getDBSecrets() {
    return this.getSecretValue('stg/vxapi-aws-kms/db')
  }
}