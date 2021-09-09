/* eslint-disable */
const { expect } = require('chai')
const express = require('express')
const config = require("../../../../config")
const graphql = require("../../../../infra/api/graphql")


const createApp = () => {
    return express()
}

describe('Create graphql server', () => {
  
  it('must create graphql server', async () => {

    const app = createApp()

    graphql(app, config)

    expect(app._router.stack.some(v => v.name === "router")).to.be.true

  })
})
