function factory(conn) {
    return {
        userRepository: new (require('./userRepository.js'))(conn)
    }
}
module.exports = factory