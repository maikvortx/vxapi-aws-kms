const { ForbiddenError } = require('apollo-server-express')
const { ApolloError } = require('apollo-server')
const { logger } = require('../../../libs')

function args2request(args, useCase) {
    const params = {}
    const fields = Object.keys(useCase.requestSchema)
    for (const field of fields) params[field] = args[field]
    return params
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

function defaultResolver(usecase) {

    return async function resolver(_, args, context) {
        const uc = usecase()
        /* Authorization */
        const hasAccess = await uc.authorize(context.user)
        if (!hasAccess) {
            // eslint-disable-next-line no-console
            logger.info(uc.auditTrail)
            throw new ForbiddenError()
        }

        /* Execution */
        const request = args2request(args, uc)
        const response = await uc.run(request)

        /* Audit */
        // eslint-disable-next-line no-console
        logger.info(uc.auditTrail)

        /* Response */
        if (response.isErr) {
            logger.error(`ERROR ${response.err.code}: ${response.err.message} \n ${response.err.stackTrace}`)
            return new ApolloError(response.err.message, response.err.code, response.err.stackTrace)
        }
        return isEmpty(response.ok) ? true : response.ok
    }
}

module.exports = defaultResolver
