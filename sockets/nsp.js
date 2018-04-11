/**
 * The socket for nsp room
 */

'use strict'

const IO = require('socket.io')
const redis = require('socket.io-redis')
const config = require('config')

module.exports = function (app) {
    let io = IO(app)

    // running socket.io with the socket.io-redis
    io.adapter(redis({
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
        db: config.redis.db
    }))

    // setting namespace
    io = io.of('/nsp')

    /**
     * verify room_id
     * room_id id is required
     */
    io.use(function (socket, next) {
        let roomId = socket.handshake.query.room_id
        if (!roomId) {
            return next(new Error('room id required'))
        }
        next()
    })

    /**
     * on connection
     * join into the room which named with room_id
     */
    io.on('connection', function (socket) {
        let roomId = socket.handshake.query.room_id
        console.log(`room: ${roomId} connected - socket.id: ${socket.id}`)
        socket.join(roomId)

        socket.on('disconnect', () => {
            console.log(`room: ${roomId} disconnected`)
        })
    })
}