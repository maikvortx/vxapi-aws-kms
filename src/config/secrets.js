const AwsSecretsManager = require('aws-sdk').SecretsManager

module.exports.SecretsManager = {
  client: new AwsSecretsManager({ region: 'sa-east-1' }),

  async getSecretValue(secretName) {
    try {
      const { SecretString } = await this.client.getSecretValue({ SecretId: secretName }).promise()
      return JSON.parse(SecretString)
    } catch (error) {
      console.log(error)
    }
  },

  async getDBSecrets() {
    return {
      DB_PORT: this.getSecretValue('stg/vxapi-aws-kms-DB_PORT'),
      DB_CLIENT: this.getSecretValue('stg/vxapi-aws-kms-DB_CLIENT'),
      DB_DATABASE: this.getSecretValue('stg/vxapi-aws-kms-DB_DATABASE'),
      DB_USER: this.getSecretValue('stg/vxapi-aws-kms-DB_USER'),
      DB_HOST: this.getSecretValue('stg/vxapi-aws-kms-DB_HOST'),
      DB_PASSWORD: this.getSecretValue('stg/vxapi-aws-kms-DB_PASSWORD')
    }
  }
}