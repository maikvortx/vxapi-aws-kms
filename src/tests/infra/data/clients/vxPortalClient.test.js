/* eslint-disable */

const sinon = require('sinon')
const { expect } = require('chai')
const VxPortalClient = require('../../../../infra/data/clients/vxPortalClient')

describe('if the waterMarkClient request to be success', () => {
  // defaults
  const baseURL = 'https://baseURL.com.br'

    afterEach(function() {
        sinon.restore();
    });

  it('must to have a correct url instance', async () => {
    //Given
    const client = new VxPortalClient(baseURL)

    // Then
    expect(client.axios.defaults.baseURL).to.be.equal(baseURL)
    expect(client.axios.defaults.timeout).to.be.equal(3000)
  })


  it('must to return an promise with an object', async () => {
    //Given
    const token = 'token'
  
    const client = new VxPortalClient(baseURL);
    sinon.stub(client.axios, 'get').withArgs('api/User/GetDecryptTokenApi', {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).resolves(new Promise((resolve) => resolve({data: { key: 'value'}})));
    
    const result = await client.getDecryptToken(token);

    // Then
    expect(result).to.be.eql({ key: 'value'});
    expect(client.axios.get.calledOnce).to.be.true;
  })
})
