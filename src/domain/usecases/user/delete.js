const { usecase, step, Ok } = require('@herbsjs/herbs')

const useCase = ({ userRepository }) => () =>
  usecase('Delete User', {
    // Input/Request metadata and validation 
    request: {
      id: Number
    },

    // Output/Response metadata
    response: Boolean,

    //Authorization with Audit
    authorize: () => Ok(),

    'Update the User': step(async ctx => {
      await userRepository.deleteByID(ctx.req.id)
      return Ok()
    })
  })

module.exports = useCase