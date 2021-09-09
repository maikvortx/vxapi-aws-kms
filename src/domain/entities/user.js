const { entity, field } = require('@herbsjs/herbs')

const User =
  entity('User', {
    id: field(Number),
    cpf: field(String),
    name: field(String),
    cnpj: field(String),
    email: field(String)
  })

User.fromJwtObject = (o) => {
  const user = new User()
  user.cpf = o.unique_name
  user.name = o.given_name,
    user.cnpj = o.company,
    user.email = o.email
  return user
}

module.exports = User
