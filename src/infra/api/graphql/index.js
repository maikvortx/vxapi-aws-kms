const { gql } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const types = require('./types')
const inputs = require('./inputs')
const queries = require('./queries')
const mutations = require('./mutations')
const repositoriesFactory = require('../../../infra/data/repositories')
const { VxPortalClient } = require('../../../infra/data/clients')
const usecases = require('../../../domain/usecases')
const db = require('../../../infra/data/database')
const { ApolloServer, addSchemaLevelResolveFunction } = require('apollo-server-express')
const authMiddleware = require('../middlewares/auth')

function generateSchema(config) {
    // TODO: rename this 'UC'
    const UCqueries = []
    const UCmutations = []

    const conn = db.factory(config) 
    const repositories = repositoriesFactory(conn)
    for(const obj of usecases){
        if(obj.tags.type === 'query')
            UCqueries.push(obj.usecase(repositories))
        else
            UCmutations.push(obj.usecase(repositories))
    }

    const graphQLDef = [].concat(types, inputs, queries.factory(UCqueries), mutations.factory(UCmutations))

    /* Type Defs (Schemas) */
    const typeDefs = graphQLDef.map(i => gql(i[0]))

    /* Resolvers */
    const resolvers = graphQLDef.map(i => i[1]).filter(i => i !== undefined)

    return { typeDefs, resolvers }
}

function prepareAuthMiddleware(config){
    const { usecase } = usecases.find(uc => uc.tags.group === 'Application')
    const vxPortal = new VxPortalClient(config.clients.portal.url)
    return authMiddleware.factory(usecase, vxPortal)
}


module.exports = (app, config) => {
    const schema = makeExecutableSchema(generateSchema(config))
    const authMiddleware = prepareAuthMiddleware(config)
    addSchemaLevelResolveFunction(schema, () => {})
    return new ApolloServer({
        introspection: true,
        playground: !config.isProd,
        debug: !config.isProd,
        schema: schema,
        context: ctx => authMiddleware(ctx)
    }).applyMiddleware({ app, path: config.api.graphql.rootPath })
}