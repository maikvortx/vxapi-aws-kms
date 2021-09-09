/* eslint-disable */
const { expect } = require('chai')
const UserRepository = require('../../../../infra/data/repositories/userRepository')
const knex = require('knex')
const { User } = require('../../../../domain/entities')
const path = require("path")

const testConnection = {
    test: {
        client: 'sqlite3',
        connection: ":memory:",
        migrations: {
            directory: path.join("src", "infra", "data", "database", "migrations")
          },
          useNullAsDefault: true
      },
}

const createConnection = async () => {
    const conn = knex(testConnection.test)
    await conn.migrate.latest()
    return conn
}


describe('User insertion success', () => {
  let conn;
  
  before(async () => {
    conn = await createConnection()
  })
  
  const perfectInput = () => { 
    return {
        cpf: '46791988384',
        name: 'complete name',
        cnpj: '22.610.500/0001-88j',
        email: 'email@rmail.com'
    }
  }
  
  afterEach(() => conn.drop)

  it('must insert a user', async () => {
    //Given
    const userRepository = new UserRepository(conn)
    const input = perfectInput()
    const args = User.fromJSON(input)
    //When
    await userRepository.insert(args)

    //Then
    const existent = await conn.select("id").from("users").whereIn("id", [1])
    expect(existent[0]).to.has.property("id")
    expect(existent[0].id).to.deep.equal(1)
  })
})
