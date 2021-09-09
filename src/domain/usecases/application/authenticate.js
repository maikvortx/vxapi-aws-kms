const { usecase, step, Ok } = require('@herbsjs/herbs')
const { User } = require('../../entities')
const { UnauthenticatedError, UnauthorizedError } = require('../../errors')

const useCase = ({ vxPortalClient }) => () =>
  usecase('Authenticate User', {
    // Input/Request metadata and validation 
    request: { token: String },

    // Output/Response metadata
    response: User,

    //Step description and function
    'Check if the User is authenticated and authorized': step(async ctx => {
      const token = await vxPortalClient.getDecryptToken(ctx.req.token)
      if (!token && token.isErr) return UnauthenticatedError(token)

      if (token.iss !== 'VxCadastro') {
        return UnauthorizedError(token)
      }
      ctx.ret.user = User.fromJwtObject(token)
      return Ok(ctx.ret.user)
    }),
  })

module.exports = useCase