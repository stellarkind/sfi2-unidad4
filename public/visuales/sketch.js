let socket;
let circleX = 200;
let circleY = 200;
let squareX = 100;
let squareY = 100;
let purple;
let currentEffect = 'normal';

function setup() {
    purple = color(188, 155, 243);
    createCanvas(400, 400);
    background(220);

    socket = io(); 

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
        try {
            let parsedData = JSON.parse(data);
            
            if (parsedData.type === 'touch') {
                circleX = parsedData.x;
                circleY = parsedData.y;
            } else if(parsedData.type === 'touch-2') {
                squareX = parsedData.x;
                squareY = parsedData.y;
            } else if(parsedData.type === 'color') {
                let r = Math.max(0, Math.min(255, parsedData.x));
                let g = Math.max(0, Math.min(255, parsedData.y));
                purple = color(r, g, 200);
            } else if(parsedData.type === 'effect') {
                currentEffect = parsedData.value;
            }
        } catch (e) {
            console.error("Error parsing received JSON:", e);
        }
    });    

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });
}

function draw() {
    background(220);

    if (currentEffect === 'normal') {
        fill(purple);
        noStroke();
        ellipse(circleX, circleY, 50, 50);
        rect(squareX, squareY, 100, 50);
    } 
    else if (currentEffect === 'outline') {
        noFill();
        stroke(purple);
        strokeWeight(3);
        ellipse(circleX, circleY, 60, 60);
        rect(squareX, squareY, 100, 50);
    } 
    else if (currentEffect === 'blink') {
        if (frameCount % 30 < 15) {
            fill(purple);
            noStroke();
            ellipse(circleX, circleY, 50, 50);
            rect(squareX, squareY, 100, 50);
        }
    }
}
