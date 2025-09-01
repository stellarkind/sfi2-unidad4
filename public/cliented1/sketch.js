let socket;

function setup() {
    createCanvas(300, 200);
    background(220);
    socket = io();

    socket.on('connect', () => {
        console.log('Desktop control connected');
    });
}

function draw() {
    background(220);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Press 1 = Normal\nPress 2 = Outline\nPress 3 = Blink\nPress 4 = Mirror', width/2, height/2);
}

function keyPressed() {
    if (socket && socket.connected) {
        if (key === '1') {
            socket.emit('message', JSON.stringify({ type: 'effect', value: 'normal' }));
        } else if (key === '2') {
            socket.emit('message', JSON.stringify({ type: 'effect', value: 'outline' }));
        } else if (key === '3') {
            socket.emit('message', JSON.stringify({ type: 'effect', value: 'blink' }));
        } else if (key === '4') {
            socket.emit('message', JSON.stringify({ type: 'effect', value: 'mirror' }));
        }
    }
}
