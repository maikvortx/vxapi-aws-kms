module.exports = [
    { usecase: require('./user/create'), tags: { group: 'Users', type: 'mutation'} },
    { usecase: require('./user/update'), tags: { group: 'Users', type: 'mutation'} },
    { usecase: require('./user/delete'), tags: { group: 'Users', type: 'mutation'} },
    { usecase: require('./user/findOne'), tags: { group: 'Users', type: 'query'} },
    { usecase: require('./application/authenticate'), tags: { group: 'Application'} }
]