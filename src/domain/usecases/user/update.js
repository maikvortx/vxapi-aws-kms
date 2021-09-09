const { usecase, step, Ok } = require('@herbsjs/herbs')
const { User } = require('../../entities')
const NotFoundError = require('../../errors/notFound')

const useCase = ({ userRepository }) => () =>
  usecase('Update User', {
    // Input/Request metadata and validation 
    request: {
      id: Number,
      name: String,
      cnpj: String,
      email: String
    },

    // Output/Response metadata
    response: User,

    //Authorization with Audit
    authorize: () => Ok(),

    //Step description and function
    'Check if the User is valid': step(async ctx => {
      const [user] = await userRepository.findByID(parseInt(ctx.req.id))
      if (!user) return NotFoundError(`user`)

      const { name, cnpj, email } = ctx.req

      user.name = name
      user.cnpj = cnpj
      user.email = email

      ctx.user = user

      if (!ctx.user.isValid()) return NotValidError('user', ctx.user.errors)
      // returning Ok continues to the next step. Err stops the use case execution.
      return Ok()
    }),

    'Update the User': step(async ctx => {
      // ctx.ret is the Use Case return
      return (ctx.ret = await userRepository.update(ctx.user))
    })
  })

module.exports = useCase