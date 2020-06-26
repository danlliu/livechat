const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server now running on port ${port}`);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on('connection', (socket) => {
    console.log("User connected");
    var user_id = null;

    socket.on('join', (username) => {
        console.log(`${username.username} joined!`);
        if (user_id == null) {
            user_id = username.username;
        }
        io.emit('user_joined', username);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
        io.emit('user_disconnected', user_id);
    });

    socket.on('message', (message) => {
        console.log(`message: ${message.message}`);
        io.emit('message', message);
    })
});