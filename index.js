/** */

const app = require('http').createServer(httpHandler)

// override global console.log
let customLog = global.console.log
global.console.log = function (messages) {
    customLog('[socket_pipe]', messages)
}

// .env config
require('dotenv').config()

// socket for nsp listening on app
require('./sockets/nsp')(app)

app.listen(process.env.PORT || 0)

app.on('listening', () => {
    console.info('\n------------------------------------------------')
    const env = process.env.NODE_ENV || 'development'
    const port = process.env.PORT
    if (!port) console.warn('[warn]', 'PORT not specified! It is recommended to use a constant port.\n')
    console.info('current env: %s', env)
    console.info('http server listening on', app.address().port)
    console.info('------------------------------------------------\n')
})

app.on('error', (err) => {
    console.error(err)
})

/**
 * handle http request
 */
function httpHandler(req, res) {
    const fs = require('fs')
    fs.readFile(__dirname + '/index.html',
        (err, data) => {
            if (err) {
                res.writeHead(500)
                return res.end('Error loading index.html')
            }
            res.writeHead(200)
            res.end(data)
        })
}