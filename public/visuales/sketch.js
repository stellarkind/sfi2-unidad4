let socket;
let circleX = 200;
let circleY = 200;
let circleSize = 50;
let currentEffect = 'normal';
let currentColor = [255, 0, 0];

function setup() {
    createCanvas(600, 400);
    background(220);

    socket = io(); 

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('message', (data) => {
        try {
            let parsedData = JSON.parse(data);

            if (parsedData.type === 'touch') {
                circleX = parsedData.x;
                circleY = parsedData.y;
            }
            if (parsedData.type === 'touch-2') {
                circleSize = map(parsedData.x, 0, width, 30, 100);
            }
            if (parsedData.type === 'color') {
                currentColor = [random(255), random(255), random(255)];
            }
            if (parsedData.type === 'effect') {
                currentEffect = parsedData.value;
            }
        } catch (e) {
            console.error("Error parsing received JSON:", e);
        }
    });
}

function draw() {
    background(20);

    if (currentEffect === 'normal') {
        fill(...currentColor);
        ellipse(circleX, circleY, circleSize, circleSize);
    } 
    else if (currentEffect === 'waves') {
        noFill();
        stroke(...currentColor);
        for (let i = 0; i < 5; i++) {
            ellipse(circleX, circleY, circleSize + i*20, circleSize + i*20);
        }
    } 
    else if (currentEffect === 'blink') {
        if (frameCount % 30 < 15) {
            fill(...currentColor);
            ellipse(circleX, circleY, circleSize, circleSize);
        }
    }
}
