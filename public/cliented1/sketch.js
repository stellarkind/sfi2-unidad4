let socket;
let circleX = 200;
let circleY = 200;
const port = 3000;


function setup() {
    createCanvas(300, 400);
    background(220);

    //let socketUrl = 'http://localhost:3000';
    socket = io(); 

    // Evento de conexión exitosa
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    // Recibir mensaje del servidor
    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
        try {
            let parsedData = JSON.parse(data);
            /*
            if (parsedData && parsedData.type === 'touch') {
                circleX = parsedData.x;
                circleY = parsedData.y;
            }
            */
        } catch (e) {
            console.error("Error parsing received JSON:", e);
        }
    });    

    // Evento de desconexión
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });
}

function draw() {
    background(220);
    fill(255, 0, 0);
    ellipse(circleX, circleY, 50, 50);
}