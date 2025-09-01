const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app); 
const io = socketIO(server);
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);

    socket.on('message', (data) => {
        try {
            let parsedData = JSON.parse(data);
            console.log('Mensaje recibido:', parsedData);

            io.emit('message', JSON.stringify(parsedData));

        } catch (e) {
            console.error("Error al parsear JSON:", e);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
