const { usecase, step, Ok } = require('@herbsjs/herbs')
const { User } = require('../../entities')
const { NotValidError } = require('../../errors')

const useCase = ({ userRepository }) => () =>
  usecase('Create User', {
    // Input/Request metadata and validation 
    request: {
      cpf: String,
      name: String,
      cnpj: String,
      email: String
    },

    // Output/Response metadata
    response: User,

    //Authorization with Audit
    authorize: () => Ok(),

    //Step description and function
    'Check if the User is valid': step(ctx => {
      ctx.user = User.fromJSON(ctx.req)

      if (!ctx.user.isValid())
        return NotValidError('User', null, ctx.user.errors)
      // returning Ok continues to the next step. Err stops the use case execution.
      return Ok()
    }),

    'Save the User': step(async ctx => {
      // ctx.ret is the Use Case return
      return (ctx.ret = await userRepository.insert(ctx.user))
    })
  })

module.exports = useCase