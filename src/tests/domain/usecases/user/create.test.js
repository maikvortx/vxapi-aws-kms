/* eslint-disable */

const sinon = require('sinon')
const { expect } = require('chai')
const createUser = require('../../../../domain/usecases/user/create')
const UserRepository = require('../../../../infra/data/repositories/userRepository')
const { User } = require('../../../../domain/entities')

const createNewStubs = () => {
  return {
    userRepo: sinon.createStubInstance(UserRepository)
  }
}

describe('if user creation to be success', () => {
  const perfectInput = () => { 
    return {
        cpf: '46791988384',
        name: 'complete name',
        cnpj: '22.610.500/0001-88j',
        email: 'email@rmail.com'
    }
  }
  
  afterEach(() => sinon.restore())

  it('must to return a user', async () => {
    const stubs = createNewStubs()
    const input = perfectInput()
    const args = User.fromJSON(input)
    const returns = User.fromJSON({ ...input, id: 1 })
    stubs.userRepo.insert.withArgs(args).returns(returns)
    
    const useCase = createUser({ userRepository: stubs.userRepo })()
    await useCase.authorize()

    const result = await useCase.run(input)

    expect(result.isOk).to.be.true
  })
})
