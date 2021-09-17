const { json } = require('body-parser')
const { generateRoutes } = require('@herbsjs/herbs2rest')
const cors = require('cors')
const express = require('express')
const renderShelfHTML = require('@herbsjs/herbsshelf')
const usecases = require('../../../domain/usecases')
const db = require('../../../infra/data/database')
const repositoriesFactory = require('../../../infra/data/repositories')

function prepareUsecases(usecases) {
    return Promise.all(usecases.map(uc => {
        const clonedUC = { ...uc }
        clonedUC.usecase = clonedUC.usecase({})()
        return clonedUC
    }))
}

async function prepareRoutes(config) {
    const conn = await db.factory(config)
    const repositories = repositoriesFactory(conn)

    const routes = [
        {
            name: 'users',
            post: { usecase: require('../../../domain/usecases/user/create')(repositories) },
            put: { usecase: require('../../../domain/usecases/user/update')(repositories) },
            delete: { usecase: require('../../../domain/usecases/user/delete')(repositories) },
            getById: { usecase: require('../../../domain/usecases/user/findOne')(repositories) }
        }
    ]
    return routes
}

module.exports = async (app, config) => {
    app.use(json({ limit: '50mb' }))
    app.use(cors())

    const router = new express.Router()

    const verbose = !config.isProd
    const routes = await prepareRoutes(config)
    generateRoutes(routes, router, verbose)
    app.use(router)

    prepareUsecases(usecases).then(async usecases => {
        const shelf = renderShelfHTML(usecases)
        app.get('/herbsshelf', (_, res) => {
            res.setHeader('Content-Type', 'text/html')
            res.write(shelf)
            res.end()
        })
    })

}