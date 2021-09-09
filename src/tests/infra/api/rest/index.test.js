/* eslint-disable */
const { expect } = require('chai')
const express = require('express')
const config = require("../../../../config")
const rest = require("../../../../infra/api/rest")



const createApp = () => {
    return express()
}

describe('Create routes and configurations with success', () => {
  
  it('must create routes', async () => {

    const app = createApp()

    rest(app, config)

    expect(app._router.stack.some(v => v.name === "router")).to.be.true
  })
})
