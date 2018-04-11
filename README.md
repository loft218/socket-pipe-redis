[Socket.IO](https://socket.io/) Pipe By Redis

### Server Side Use

```
const socket_redis = {
    "host": "127.0.0.1",
    "port": 6379,
    "password": "rn6hIJFz7RAPsuGRu2Ojxx6q3rxCFX0a",
    "db": 1
}

const io = require('socket.io-emitter')(socket_redis)
const nsp = io.of('/nsp')

nsp.to('aa').emit('#EVENT', 'data')
```