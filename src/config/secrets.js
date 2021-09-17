const AwsSecretsManager = require('aws-sdk').SecretsManager

module.exports.SecretsManager = {
  client: new AwsSecretsManager({ region: 'sa-east-1' }),

  async getSecretValue(secretName) {
    try {
      const { SecretString, SecretBinary } = await this.client.getSecretValue({ SecretId: secretName }).promise()

      if (SecretString) return SecretString

      return Buffer(SecretBinary, 'base64').toString('ascii');
    } catch (error) {
      console.log(error)
    }
  },

  async getDBSecrets() {
    return {
      DB_PORT: await this.getSecretValue('stg/vxapi-aws-kms-DB_PORT'),
      DB_CLIENT: await this.getSecretValue('stg/vxapi-aws-kms-DB_CLIENT'),
      DB_DATABASE: await this.getSecretValue('stg/vxapi-aws-kms-DB_DATABASE'),
      DB_USER: await this.getSecretValue('stg/vxapi-aws-kms-DB_USER'),
      DB_HOST: await this.getSecretValue('stg/vxapi-aws-kms-DB_HOST'),
      DB_PASSWORD: await this.getSecretValue('stg/vxapi-aws-kms-DB_PASSWORD')
    }
  }
}