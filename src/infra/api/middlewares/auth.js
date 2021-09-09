const { logger } = require('../../../libs')

function extractToken (req) {
  const headerToken = req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'
  const queryToken = req.query && req.query.token

  if (headerToken) return req.headers.authorization.split(' ')[1]
  if (queryToken) return req.query.token
  return null
}

function factory(authUseCase, vxPortalClient){
  return async ({ req, res }) => {
    let tokenAuth = extractToken(req)
  
    if (!tokenAuth) {
      logger.error('unauthenticated user', new Error(`unauthenticated token: ${tokenAuth}`))
      res.status(401).json({ code: 'UNAUTHENTICATED', message: 'unauthenticated token' })
      throw new Error('unauthenticated user')
    }

    // Authentication via API_KEY
    // if(tokenAuth === process.env.APPLICATION_LAMBDA_IMPORT){
    //   return next();
    // }
  
    const uc = authUseCase({vxPortalClient})()
    const responseAuth = await uc.run({ token: tokenAuth })

    if (responseAuth.isErr) {
      logger.error(`error: ${responseAuth.err}`, new Error(responseAuth.err))
      res.status(401).json(responseAuth.err)
      throw new Error('unauthenticated user')
    }
    req.user = { user: responseAuth.ok.user, token: tokenAuth }
  }
}

module.exports = { factory }
