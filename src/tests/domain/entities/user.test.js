/* eslint-disable */
const User = require("../../../domain/entities/user")
const { expect } = require('chai')


describe('User instance creation', () => {

  it('must create a user instance',  () => {
    const user = new User()
    user.name = "test"
    

    expect(user.name).to.be.equal("test")
  })
})
