const express = require('express')
const app = express()

const server = app.listen(3000);
const io = require('socket.io')(server)
console.log('Server start on port 3000');

let bodyParser = require('body-parser')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('Connected !');

    socket.on('message', (data) => {
        io.emit('message', data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})
