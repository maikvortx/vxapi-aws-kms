const { create } = require('axios')
const { Err } = require('@herbsjs/herbs')

class VxPortalClient {
  constructor(baseURL) {
    this.axios = create({
      baseURL,
      timeout: 3000
    })
  }

  getDecryptToken(token) {
    return this.axios.get('api/User/GetDecryptTokenApi', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => response.data)
      .catch(err => Err(err))
  }
}

module.exports = VxPortalClient
